import React from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home'
import Login from './Login'
import Requests from './Requests'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './App.css';

function App() {
    return (
      <Router>
      <Navbar>
      <Navbar.Brand href="/">UltiChart</Navbar.Brand>
        <Nav className = "mr-auto">
          <Link to ="/">Home</Link>
          <Link to ="/requests">Requests</Link>
          <Link to ="/login">Login</Link>
        </Nav>
      </Navbar>
        <Route path = "/" exact render = {() => <Home/>}/>
        <Route path = "/login" render = {() => <Login/>}/>
        <Route path = "/requests" render = {() => <Requests/>}/>
      </Router>
    )};

export default App;
