import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Requests from './Requests';
import './App.css';
import {Nav, Navbar} from 'react-bootstrap';

class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <Navbar className ="navbar-bgColor"  variant = "dark">
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
}

export default App;
