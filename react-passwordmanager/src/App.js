import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import LoginForm from './components/loginform';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path ='/'element= {<Home/>}/>
        <Route path ='/login' element = {<LoginForm/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
