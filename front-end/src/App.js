import React, {Component} from 'react';
import axios from 'axios'; 
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Requests from './Requests'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';


class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      nodeBinding: { field_0: "firstName" }, 
      nodes: [] 
    };
  }

  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }


  options = {
    method: 'get', 
    url: '/employees'
  };

  fetchEmployees() {
    axios(this.options)
      .then(data => {
        data.data.forEach(obj =>this.renameKey(obj, 'managerId', 'pid'))
        data.data.forEach(obj =>this.renameKey(obj, 'employeeId', 'id'))

        this.setState({nodes: data.data})
      })
  }


  componentDidMount() {
    this.fetchEmployees();
  }


  componentDidUpdate() { 
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true; 
    s.innerHTML = "var chart = new OrgChart(document.getElementById(\"tree\")," + JSON.stringify(this.state) + ");";
    this.instance.appendChild(s);
  }

  render() {
    const {nodes} = this.state; 
    console.log(nodes)
    return(
      <div>
      <div id="tree" ref={el => (this.instance = el)} />
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
    )
  }

}

export default App;
