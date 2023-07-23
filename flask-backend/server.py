from flask import Flask, request, jsonify

app = Flask(__name__)

# DATABASE = 'password_manager.db'
# SECRET_KEY = b'your-secret-key'  # Generate a secure secret key and keep it secret!

# def encrypt_password(password):
#     fernet = Fernet(base64.urlsafe_b64encode(SECRET_KEY))
#     encrypted_password = fernet.encrypt(password.encode())
#     return encrypted_password.decode()

# def decrypt_password(encrypted_password):
#     fernet = Fernet(base64.urlsafe_b64encode(SECRET_KEY))
#     decrypted_password = fernet.decrypt(encrypted_password.encode())
#     return decrypted_password.decode()

# def create_user(username, password):
#     conn = sqlite3.connect(DATABASE)
#     cursor = conn.cursor()
#     hashed_password = generate_password_hash(password)
#     encrypted_password = encrypt_password(password)
#     cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, encrypted_password))
#     conn.commit()
#     conn.close()

# def get_user(username):
#     conn = sqlite3.connect(DATABASE)
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM users WHERE username=?", (username,))
#     user = cursor.fetchone()
#     conn.close()
#     return user

# @app.route('/login', methods=['POST'])
# def login():
#     username = request.json['username']
#     password = request.json['password']
    
#     user = get_user(username)
    
#     if user and check_password_hash(user[2], password):
#         decrypted_password = decrypt_password(user[2])
#         if decrypted_password == password:
#             return jsonify(message='Login successful'), 200
    
#     return jsonify(message='Invalid username or password'), 401

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    
    # if get_user(username):
    #     return jsonify(message='Username already exists'), 400
    
    # create_user(username, password)
    # return jsonify(message='User registered successfully'), 201
    return jsonify(message='Successful connection between React and Flask'), 200

@app.route('/test')
def test():
    return jsonify(message='Yay!'), 200

if __name__ == '__main__':
    app.run(debug=True)