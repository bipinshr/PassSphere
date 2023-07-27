import React from "react";
// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PasswordPage from "./components/pages/PasswordPage";
// import bgimage from "./images/logo.png";
import "./App.css";
import PassGen from "./components/pages/PassGen";

function App() {
  return (
    <Router>
      {/* <Navbar />
      <img src={bgimage} alt="bg" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/PassGen" element={<PassGen />} />
        <Route path="/page" element={<PasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
