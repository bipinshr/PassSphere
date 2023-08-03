import React, { useEffect, useState } from "react";
import "./PasswordVault.css";
import Axios from "axios";
import PasswordBox from "./PasswordBox";

function PasswordVault() {
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [Listpasswords, setListPasswords] = useState([]);
  const [decryptedPasswords, setDecryptedPasswords] = useState({});
  const [message, setMessage] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpassword").then((response) => {
      setListPasswords(response.data);
    });
  }, []);

  const addPassword = () => {
    if (!website || !account || !password) {
      setMessage("All fields are required");
      return;
    }

    Axios.post("http://localhost:3001/addpassword", { Website: website, password: password, account: account })
      .then((response) => {
        if (response.data === "Success") {
          // Fetch the updated password list after adding the new password
          Axios.get("http://localhost:3001/showpassword").then((response) => {
            setListPasswords(response.data);
            setMessage("Password added successfully");
            setWebsite("");
            setAccount("");
            setPassword("");
            setDecryptedPasswords({}); // Clear decrypted passwords
          });
        } else {
          setMessage("Failed to add password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error adding password:", error);
        setMessage("Failed to add password. Please try again.");
      });
  };

  const deletePassword = (id) => {
    Axios.post("http://localhost:3001/deletepassword", { id })
      .then((response) => {
        // Remove the deleted password from the list of passwords in state
        setListPasswords(Listpasswords.filter((password) => password.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting password:", error);
      });
  };

  const decryptPassword = (encryption) => {
    if (isDecrypting) {
      return;
    }

    setIsDecrypting(true);

    Axios.post("http://localhost:3001/decryptpassword", { password: encryption.password, iv: encryption.iv })
      .then((response) => {
        setDecryptedPasswords((prevState) => ({
          ...prevState,
          [encryption.id]: response.data,
        }));
        setIsDecrypting(false);
      })
      .catch((error) => {
        console.error("Error decrypting password:", error);
        setIsDecrypting(false);
      });
  };
  const toggleDecryptedPassword = (id) => {
    setDecryptedPasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <div className="addPass">
        <div className="addingPassword">
          <input
            type="text"
            placeholder="Eg.Netflix, Facebook"
            value={website}
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Username098"
            value={account}
            onChange={(event) => {
              setAccount(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Password123$"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={addPassword}> Add Password</button>
        </div>
        {message && <p>{message}</p>} {/* Display the message if it is not empty */}
      </div>

      <div className="headName">
        <h1>My Passwords</h1>
      </div>

      <PasswordBox
        passwordList={Listpasswords}
        decryptedPasswords={decryptedPasswords}
        toggleDecryptedPassword={toggleDecryptedPassword}
        decryptPassword={decryptPassword}
        onDelete={deletePassword}
      />
    </div>
  );
}

export default PasswordVault;
