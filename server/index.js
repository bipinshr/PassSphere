const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./Encrypt");
const { Auth0Client } = require("@auth0/auth0-spa-js");
app.use(cors());
app.use(express.json());

//setting up database connection
const db = mysql.createConnection({
  user: "PassSphere",
  host: "passsphere.mysql.database.azure.com",
  password: "P@ssSphere123",
  database: "auth0_user",
});

// Auth0 configuration
const auth0 = new Auth0Client({
  domain: "dev-5r6m0o5effncayya.us.auth0.com",
  client_id: "vPhyIQ9iT2B0YLEdlhDKwDfsWAyPJcwB",
  redirect_uri: "http://localhost:3004/callback",
});

app.get("/showpassword/:userid", (req, res) => {
  const userid = parseInt(req.params.userid);
  console.log("Received userid:", userid);

  // Check if userid is NaN or undefined
  if (isNaN(userid)) {
    console.log("Invalid userid provided.");
    res.status(400).send("Invalid userid provided.");
    return;
  }

  // Query the passwords table with the WHERE clause
  db.query("SELECT * FROM passwords WHERE userid = ?;", [userid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving passwords.");
    } else {
      res.send(result);
    }
  });
});

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
  const { Website, account, password, userid } = req.body;
  const encryption_password = encrypt(password);

  db.query(
    "INSERT INTO passwords (Website, account, password, iv,userid) VALUES (?, ?, ?, ?,?)",
    [Website, account, encryption_password.password, encryption_password.iv, userid],
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

app.get("/showpassword/:userid", (req, res) => {
  const userid = parseInt(req.params.userid); // Convert the string to an integer
  console.log({ userid });

  // Query the passwords table with the WHERE clause
  db.query("SELECT * FROM passwords WHERE userid = ?;", [userid], (err, result) => {
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

app.post("/submitUserData", (req, res) => {
  const userData = req.body;

  // Check if the user already exists in the database based on userid
  const checkUserQuery = "SELECT * FROM users WHERE google = ?";
  db.query(checkUserQuery, [userData.userid], (err, rows) => {
    if (err) {
      console.log("Error checking user:", err);
      res.status(500).send("Error checking user.");
    } else {
      if (rows.length === 0) {
        // If the user does not exist, insert the user data into the "users" table
        const insertQuery = "INSERT INTO users (google, username, email, picture, nickname) VALUES (?, ?, ?, ?, ?)";
        const values = [userData.userid, userData.username, userData.email, userData.picture, userData.nickname];

        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.log("Error inserting user information:", err);
            res.status(500).send("Error inserting user information.");
          } else {
            console.log("User information successfully inserted into the database.");
            res.sendStatus(200);
          }
        });
      } else {
        // If the user already exists, update the user data in the "users" table
        const updateQuery = "UPDATE users SET username = ?, picture = ?, nickname = ? WHERE google = ?";
        const updateValues = [userData.username, userData.picture, userData.nickname, userData.userid];

        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            console.log("Error updating user information:", err);
            res.status(500).send("Error updating user information.");
          } else {
            console.log("User information successfully updated in the database.");
            res.sendStatus(200);
          }
        });
      }
    }
  });
});

app.get("/getInsertedUserId/:email", (req, res) => {
  const email = req.params.email;
  // console.log("Requested email:", email);

  const getUserIdQuery = "SELECT userid FROM users WHERE email = ?";
  // console.log("Query:", getUserIdQuery);
  db.query(getUserIdQuery, [email], (err, result) => {
    if (err) {
      console.log("Error fetching userid from the database:", err);
      res.status(500).send("Error fetching userid from the database.");
    } else {
      if (result.length > 0) {
        const useridFromDatabase = result[0].userid;
        res.status(200).json({ userid: useridFromDatabase });
      } else {
        res.status(404).send("User not found.");
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
