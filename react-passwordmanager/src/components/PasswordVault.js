import React, { useState } from "react";
import "./PasswordVault.css";

function PasswordVault() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [passwordsArray, setPasswordsArray] = useState([]);

  const handleAddClick = () => {
    if (userName && password && site) {
      const newPasswordEntry = {
        userName: userName,
        password: password,
        site: site,
      };

      // Add the new entry to the passwordsArray
      setPasswordsArray([...passwordsArray, newPasswordEntry]);

      // Clear the input fields
      setUserName("");
      setPassword("");
      setSite("");
    }
  };

  return (
    <div className="passCon">
      <h1>This is password vault</h1>
      <div>
        <input type="text" placeholder="USERNAME" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="text" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="WEBSITE" value={site} onChange={(e) => setSite(e.target.value)} />
        <button onClick={handleAddClick}>Add</button>
      </div>

      {/* Display the passwordsArray */}
      <div>
        <h2>Password Entries:</h2>
        <ul>
          {passwordsArray.map((entry, index) => (
            <li key={index}>
              <strong>Site:</strong> {entry.site}, <strong>Username:</strong> {entry.userName},{" "}
              <strong>Password:</strong> {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PasswordVault;
