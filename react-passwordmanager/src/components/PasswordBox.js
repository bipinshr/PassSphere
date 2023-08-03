import React from "react";
import Axios from "axios";

function PasswordBox(props) {
  const { passwordList, decryptedPasswords, toggleDecryptedPassword, decryptPassword, onDelete } = props;

  const handleDelete = (id) => {
    Axios.post("http://localhost:3001/deletepassword", { id }).then((response) => {
      // Call the onDelete function to update the state in the parent component
      onDelete(id);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {passwordList.map((val) => (
        <div key={val.id} style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
          <h3>Username: {val.account}</h3>
          {decryptedPasswords[val.id] ? <p>Password: {decryptedPasswords[val.id]}</p> : <p>Password: *****</p>}
          <p>Website: {val.Website}</p>
          <button
            onClick={() => {
              if (!decryptedPasswords[val.id]) {
                decryptPassword({ password: val.password, iv: val.iv, id: val.id });
              }
              toggleDecryptedPassword(val.id);
            }}
          >
            {decryptedPasswords[val.id] ? "Hide Password" : "Show Password"}
          </button>
          <button onClick={() => handleDelete(val.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PasswordBox;
