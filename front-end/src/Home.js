import React from 'react';
<<<<<<< HEAD

import './App.css';

function Home() {
  return (
    <div className="App">
        <h1>
          hello world
        </h1>
    </div>
  );
=======
import { Col, Form, Button } from 'react-bootstrap';
import './App.css';
import TreeExample from './ChartComponent/TreeExample'

class Home extends React.Component {
  handleOnClick() {
    alert();
  }
  render() {
    return (
      <div className="home">
        <div>
          <h1 className="home-text">Home</h1>
          <Form>
            <Form.Row style={{ display: "flex", justifyContent: "center" }}>
              <Col xs="auto" ><Form.Control placeholder="First name" /></Col>
              <Col xs="auto" ><Form.Control placeholder="Last name" /></Col>
              <Col xs="auto" ><Button variant="outline-info" onClick={this.handleOnClick}>Search</Button></Col>
            </Form.Row>
          </Form>
        </div>
        <div>
          <TreeExample/>
        </div>
      </div>
    );
  }
>>>>>>> 488fc496fb59fc0232d76044069c93e557798680
}

export default Home;
