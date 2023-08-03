import React, { useEffect, useState } from "react";
import "./PasswordVault.css";
import Axios from "axios";

function PasswordVault() {
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [Listpasswords, setListPasswords] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpassword").then((response) => {
      setListPasswords(response.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", { website: website, password: password, account: account });
  };

  const decrypt_password = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", { password: encryption.password, iv: encryption.iv }).then(
      (response) => {
        setListPasswords(
          Listpasswords.map((val) => {
            return val.id === encryption.id
              ? { id: val.id, password: val.password, account: response.data, iv: val.iv }
              : val;
          })
        );
      }
    );
  };

  return (
    <div>
      <div className="addPass">
        <div className="addingPassword">
          <input
            type="text"
            placeholder="Eg.Netflix, Facebook"
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Username098"
            onChange={(event) => {
              setAccount(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Password123$"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={addPassword}> Add Password</button>
        </div>
      </div>

      <div className="headName">
        <h1>My Passwords</h1>
      </div>

      <div className="PasswordList">
        {Listpasswords.map((val, key) => {
          return (
            <div
              className="passwords"
              onClick={() => {
                decrypt_password({ password: val.password, iv: val.iv, id: val.id });
              }}
              key={key}
            >
              <h3>{val.account}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PasswordVault;
