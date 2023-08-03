import React from "react";

function PasswordBox(props) {
  const { passwordList } = props;

  return (
    <div style={{ display: "flex" }}>
      {passwordList.map((val) => (
        <div key={val.id} style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
          <h3>Username: {val.username}</h3>
          <p>Password: {val.password}</p>
          <p>Website: {val.website}</p>
        </div>
      ))}
    </div>
  );
}

export default PasswordBox;
