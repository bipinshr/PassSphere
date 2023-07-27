import React, { useState } from "react";
import "../App.css";
// import Navbar from "../Navbar";
// import Main from "../Main";

import "./LoginForm.css";

const LoginForm = () => {
  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };
  return (
    <div className="cover">
      <h1>Login</h1>
      <input type="text" placeholder="username" />
      <input type="text" placeholder="password" />

      <div className="login-btn" onClick={popup}>
        Login{" "}
      </div>

      <p className="text"> Or login using </p>

      <div className="alt-login">
        <div className="uta-email"></div>
        <div className="google"></div>
      </div>

      <div className={popupStyle}>
        <h3>Login Failed</h3>
        <p>Username or password incorrect</p>
      </div>
    </div>
  );
};

export default LoginForm;
