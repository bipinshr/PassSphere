const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./Encrypt");
const { Auth0Client } = require("@auth0/auth0-spa-js");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "PasswordManager",
});

// Auth0 configuration
const auth0 = new Auth0Client({
  domain: "dev-5r6m0o5effncayya.us.auth0.com",
  client_id: "vPhyIQ9iT2B0YLEdlhDKwDfsWAyPJcwB",
  redirect_uri: "http://localhost:3004/callback",
});

app.use(cors());
app.use(express.json());

app.post("/deletepassword", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM passwords WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting password.");
    } else {
      res.send("Success");
    }
  });
});

app.post("/addpassword", (req, res) => {
  const { Website, account, password } = req.body;
  const encryption_password = encrypt(password);

  db.query(
    "INSERT INTO passwords (Website, account, password, iv) VALUES (?, ?, ?, ?)",
    [Website, account, encryption_password.password, encryption_password.iv],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding password.");
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
      res.status(500).send("Error retrieving passwords.");
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  const decryptedPassword = decrypt(req.body);
  res.send(decryptedPassword);
});

// Auth0 login route
app.get("/login", (req, res) => {
  const authorizeUrl = auth0.buildAuthorizeUrl();
  res.redirect(authorizeUrl);
});

// Auth0 callback route
app.get("/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await auth0.getTokenWithCode({ code });
    const accessToken = tokenResponse.accessToken;
    // You can store the access token in the session or use it for API calls.
    // For simplicity, let's just return it in the response for now.
    res.send(accessToken);
  } catch (error) {
    console.log(error);
    res.status(500).send("Authentication Failed.");
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
