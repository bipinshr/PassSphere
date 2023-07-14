import React from "react";
// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
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
      </Routes>
    </Router>
  );
}

export default App;
