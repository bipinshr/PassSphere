import React from "react";
import "../App.css";
// import { Button } from "./Button";
import "./Main.css";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";

import bgimage from "../images/logo.png";
function Main() {
  return (
    <div className="Main-container">
      <Navbar />
      <img src={bgimage} alt="bg" />
      <h1> PassSphere: Password Manager</h1>
      <p>One password for all your accounts</p>
      <div className="main-btns">
        <Link to="/passGen">GET STARTED</Link>
      </div>
    </div>
  );
}

export default Main;
