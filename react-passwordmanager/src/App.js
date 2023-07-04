import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import bgimage from "./images/logo.png";

function App() {
  return (
    <>
 
    <Router>
      <Navbar />
      <img src={bgimage} alt="bg"/>
      <Routes>

        <Route path ='/' exact component= {Home}/>

      </Routes>
    </Router>
      
    </>
  );
}

export default App;
