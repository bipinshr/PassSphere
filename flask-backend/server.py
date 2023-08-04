from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
import os
import dotenv
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2
from argon2 import PasswordHasher

dotenv.load_dotenv()
app = Flask(__name__)
CORS(app)
ph = PasswordHasher()

server = os.getenv('SERVER')
database = os.getenv('DATABASE')
username = os.getenv('EMAIL')
password = os.getenv('PASSWORD')
driver = os.getenv('DRIVER')
db_conn_str = f'Driver={driver};Server=tcp:{server},1433;Database={database};Uid={username};Pwd={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;Authentication=ActiveDirectoryPassword'
logged_in = False
master_password = None

def derive_key(password, salt):
    key = PBKDF2(password, salt, dkLen=32, count=100000)
    return key

def hash_password(password):
    return ph.hash(password)

def verify_password(hash, password):
    try:
        ph.verify(hash, password)
        return True
    except:
        return False

def encrypt_data(account_data, master_password):
    salt = get_random_bytes(16)
    key = derive_key(master_password, salt)
    cipher = AES.new(key, AES.MODE_GCM)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(account_data.encode())
    return salt.hex(), nonce.hex(), ciphertext.hex(), tag.hex()

def decrypt_data(salt_hex, nonce_hex, ciphertext_hex, tag_hex, master_password):
    salt = bytes.fromhex(salt_hex)
    nonce = bytes.fromhex(nonce_hex)
    ciphertext = bytes.fromhex(ciphertext_hex)
    tag = bytes.fromhex(tag_hex)
    key = derive_key(master_password, salt)
    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    decrypted_data = cipher.decrypt_and_verify(ciphertext, tag)
    return decrypted_data.decode()

def create_user(email, password):
    db_conn = pyodbc.connect(db_conn_str)
    cursor = db_conn.cursor()
    hashed_password = hash_password(password)
    cursor.execute("INSERT INTO Users (email, passwordhash) VALUES (?, ?)", (email, hashed_password))
    db_conn.commit()
    db_conn.close()

def get_user(email):
    db_conn = pyodbc.connect(db_conn_str)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE email=?", (email,))
        user = cursor.fetchone()
        db_conn.close()
        return user
    except:
        return False

def get_account_credentials(website):
    db_conn = pyodbc.connect(db_conn_str)
    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM accounts WHERE servicename=?", (website,))
        account = cursor.fetchone()
        db_conn.close()
        return account
    except:
        return False

def create_account(website, username, password, userId):
    db_conn = pyodbc.connect(db_conn_str)
    cursor = db_conn.cursor()
    salt, nonce, ciphertext, tag = encrypt_data(password, master_password)
    try:
        cursor.execute("INSERT INTO Accounts (userId, serviceName, username, salt, nonce, cipherText, tag) VALUES (?, ?, ?, ?, ?, ?, ?)", (userId, website, username, salt, nonce, ciphertext, tag))
        db_conn.commit()
        db_conn.close()
        return True
    except Exception as error:
        return error

@app.route('/sign-up', methods=['POST'])
def sign_up():
    email = request.json['email']
    password = request.json['password']

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400
    if get_user(email):
        return jsonify(message='Email already exists.'), 400
    
    master_password = password
    create_user(email, password)
    logged_in = True
    return jsonify(message='User registered successfully.'), 201

@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400
    user = get_user(email)
    if user == False:
        return jsonify({'error': 'User not found.'}), 400
    
    hash_password = user[2]
    if verify_password(hash_password, password):
        logged_in = True
        master_password = password
        return jsonify({'message': 'Login successful.'}), 200
    
    return jsonify({'error': 'Invalid credentials.'}), 400

@app.route('/website-credentials', methods=['POST'])
def get_website_credentials():
    website = request.json['website']

    if not logged_in:
        return jsonify({'error': 'Please log in.'}), 400
    if not website:
        return jsonify({'error': 'Website is required.'}), 400
    
    account = get_account_credentials(website)
    if account == None:
        return jsonify({'message': 'No account found for this website!'}), 200
    return jsonify({'website': account[2], 'username': account[3], 'password': decrypt_data(account[4], account[5], account[6], account[7], master_password)}), 200

if __name__ == '__main__':
    app.run(debug=True)