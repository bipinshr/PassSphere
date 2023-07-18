import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link} from 'react-router-dom';
import './Navbar.css';
import './loginform.css';
import LoginForm from './loginform';
import Home from './pages/Home';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    if (handleLoginClick)
    {
    setShowLoginForm(true);
    }
    else 
    {
      setShowLoginForm(false);
    }
    // Additional logic if needed
  };


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
  // function openLogin() {
  //   console.log("ok");
  // }

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PassSphere
            <i className="fa-solid fa-code-branch" />
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
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>

            <li className='nav-item' >
            <Link
              to='/loginform'
              className='nav-links'
              onClick={() => {
                handleLoginClick(); 
              }}
            > 
              Login
            </Link>
          </li>
            <li>
              <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav>
      {showLoginForm ? <LoginForm/> :<Home/>} 
    </>
  );
}

export default Navbar;
