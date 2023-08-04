import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import "./components/Profile.css";
import "./App.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import PassGen from "./components/pages/PassGen";
import PasswordPage from "./components/pages/PasswordPage";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="cards-container">
          <div className="cards-wrapper">
            <h2>Please log in to view your profile.</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cards-container">
        <div className="cards-wrapper">
          <div className="profile-picture">
            <img src={user.picture} alt="Profile" />
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
          </div>

          <div className="main-btns">
            <Link to="/page">page</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin} // Use redirectUri instead of authorizationParams
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PassGen" element={<PassGen />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/page" element={<PasswordPage />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}
export default App;
