import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    // Attach the event listener for the "resize" event
    window.addEventListener("resize", showButton);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []); // Empty dependency array, runs only once after mount

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PassSphere <i className="fa-solid fa-code-branch" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-links" onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/passGen" className="nav-links" onClick={closeMobileMenu}>
                PassGen
              </Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <button className="btn--outline" onClick={() => logout()}>
                  Logout
                </button>
              ) : (
                button && (
                  <Button className="btn--outline" onClick={() => loginWithRedirect()}>
                    Login
                  </Button>
                )
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
