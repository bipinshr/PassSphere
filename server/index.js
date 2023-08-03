const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./Encrypt");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "PasswordManager",
});

app.post("/deletepassword", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM passwords WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});

app.post("/addpassword", (req, res) => {
  const { Website, account, password } = req.body;
  const encryption_password = encrypt(password);

  db.query(
    "INSERT INTO passwords (Website,account, password, iv) VALUES (?,?, ?, ?)",
    [Website, account, encryption_password.password, encryption_password.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/showpassword", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => {
  console.log("Server is running");
});
