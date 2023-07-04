import React from 'react';
import '../App.css';
import {Button} from './Button';
import './Main.css';


function Main() {
    return (
        <div className='Main-container'>
            <h1> PassSphere: Password Manager</h1>
            <p>One password for all your accounts</p>
            <div className='main-btns'>
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>GET STARTED</Button>
            </div>
        </div>

    )
}

export default Main;