const crypto = require("crypto");
const key = "gggggggggggggggggggggggggggggggg";

const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(key), iv);

  const encrypted_password = Buffer.concat([cipher.update(password), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    password: encrypted_password.toString("hex"),
  };
};

const decrypt = (encrypt_password) => {
  const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(key), Buffer.from(encrypt_password.iv, "hex"));

  const decrypted_password = Buffer.concat([
    decipher.update(Buffer.from(encrypt_password.password, "hex")),
    decipher.final(),
  ]);

  return decrypted_password.toString();
};

module.exports = { encrypt, decrypt };
