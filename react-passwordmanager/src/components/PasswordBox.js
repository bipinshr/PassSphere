import React from "react";
import Axios from "axios";
import "./PasswordBox.css";

function PasswordBox(props) {
  const { passwordList, decryptedPasswords, toggleDecryptedPassword, decryptPassword, onDelete } = props;

  const handleDelete = (id) => {
    Axios.post("http://localhost:3001/deletepassword", { id }).then((response) => {
      // Call the onDelete function to update the state in the parent component
      onDelete(id);
    });
  };

  return (
    <div className="column">
      {passwordList.map((val) => (
        <div key={val.id} className="password">
          <div className="row">
            <span className="label">Username:</span>
            <span className="value">{val.account}</span>
          </div>
          {decryptedPasswords[val.id] ? (
            <div className="row">
              <span className="label">Password:</span>
              <span className="value">{decryptedPasswords[val.id]}</span>
            </div>
          ) : (
            <div className="row">
              <span className="label">Password:</span>
              <span className="value">*****</span>
            </div>
          )}
          <div className="row">
            <span className="label">Website:</span>
            <span className="value">{val.Website}</span>
          </div>
          <div className="row">
            <button
              className="btn"
              onClick={() => {
                if (!decryptedPasswords[val.id]) {
                  decryptPassword({ password: val.password, iv: val.iv, id: val.id });
                }
                toggleDecryptedPassword(val.id);
              }}
            >
              {decryptedPasswords[val.id] ? "Hide Password" : "Show Password"}
            </button>
            <button className="btn--delete-btn" onClick={() => handleDelete(val.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PasswordBox;
