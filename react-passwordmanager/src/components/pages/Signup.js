import React from "react";
import "../../App.css";
import Navbar from "../Navbar";
import SignupForm from "../SignupForm";
// import Main from "../Main";

function Signup() {
  return (
    <div>
      <Navbar />
      <SignupForm />
      <h2>Signup page</h2>
    </div>
  );
}

export default Signup;
