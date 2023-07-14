import React from "react";
import "../App.css";
//import { Button } from "./Button";
import "./Main.css";
import Navbar from "./Navbar";
import CardItem from './CardItem';
import './Card.css';

import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="Main-container">
      <Navbar />
      <h1> PassSphere: Password Manager</h1>
      <p>One password for all your accounts</p>
      <div className="main-btns">
        <Link to="/passGen">PassGen</Link>
      </div>
      <div className='cards'>
        <h1>Why PassSphere?</h1>
        <div className="cards_container">
          <div className="cards_wrapper">
            <ul className="cards_items">
              <CardItem
                src="images/dollar.jpeg"
                text="Cheapest Password Manager available"
                label='Plans starting from only $9.99/year'
                path='/sign-up'
                info={
                  <ul>
                    <li>Store a maximum of first 10 account passwords for free</li>
                    <li>Start your free 30-day trial period</li>
                    <li>Only pay for the features that you use</li>
                    <li>Business and personal plans available</li>
                  </ul>
                }
              />
              <CardItem
                src="images/Encrypt.jpeg"
                text="Password stored in an encrypted format"
                label='AES-256 bit Encryption algorithm'
                path='/sign-up'
                info={
                  <ul>
                    <li>Never worry about yout account security</li>
                    <li>Best encryption algorithm to store all your passwords</li>
                  </ul>
                }
              />
            </ul>
            <ul className="cards_items">
              <CardItem
                src="images/gen.jpeg"
                text="Built in password generator"
                label='PassGen'
                path='/sign-up'
                info={
                  <ul>
                    <li>Randomly generate a unique password for your new accounts</li>
                    <li>Regenerate unique passwords until satisfied</li>
                  </ul>
                }
              />
              <CardItem
                src="images/auto.jpeg"
                text="Autofill passwords using Chrome extensions"
                label='Autofill'
                path='/sign-up'
                info={
                  <ul>
                    <li>Add a Chrome extension to enable password autofill</li>
                    <li>Automatically log in to your accounts wiht the autofill feature</li>
                  </ul>
                }
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
