import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './Home'
import Login from './Login'
import Requests from './Requests'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

function App() {
  return (
    <div>
    <Router>
      <Navbar className ="navbar"  variant = "dark">
        <Navbar.Brand href="/" >UltiChart</Navbar.Brand>
        <Nav className = "navbar-main">
          <Nav.Link href = "/">Home</Nav.Link>
          <Nav.Link href = "/login">Login</Nav.Link>
          <Nav.Link href = "/requests">Requests</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Router exact path = "/"><Home/></Router>
        <Router path = "/login"><Login/></Router>
        <Router path = "/requests"><Requests/></Router>
      </Switch>
    </Router>
  </div>
);
}

export default App;
