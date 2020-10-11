import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import './App.css';
import Chart from './components/chart';
//import TreeExample from './ChartComponent/TreeExample'

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
            <Form.Row style={{ display: "flex", justifyContent: "center", paddingBottom: "10px" }}>
              <Col xs="auto" ><Form.Control placeholder="First name" /></Col>
              <Col xs="auto" ><Form.Control placeholder="Last name" /></Col>
              <Col xs="auto" ><Button variant="outline-info" onClick={this.handleOnClick}>Search</Button></Col>
            </Form.Row>
          </Form>
        </div>
        <div>
          {/* data input here use the example like this:
              data = {[
                "firstName" : "Adrienne",
                "lastName" : "Hawkins",
                "companyId" : 3,
                "password" : "hawkinsad",
                "positionTitle" : "CEO",
                "companyName" : "Nightwell Enterprise",
                "isManager" : true,
                "employeeId" : 1,
                "managerId" : null,
                "email" : "Adrienne_Hawkins@nightwellenterprise.com",
                "startDate" : "1995-11-06"
              ]}
          */}
          <Chart data = {[
            {
              "firstName" : "Adrienne",
              "lastName" : "Hawkins",
              "companyId" : 3,
              "password" : "hawkinsad",
              "positionTitle" : "CEO",
              "companyName" : "Nightwell Enterprise",
              "isManager" : true,
              "employeeId" : 1,
              "managerId" : null,
              "email" : "Adrienne_Hawkins@nightwellenterprise.com",
              "startDate" : "1995-11-06"
            }, {
              "firstName" : "Bernadine",
              "lastName" : "Richard",
              "companyId" : 3,
              "password" : "richardbe",
              "positionTitle" : "Engineering Manager",
              "companyName" : "Nightwell Enterprise",
              "isManager" : true,
              "employeeId" : 2,
              "managerId" : 1,
              "email" : "Bernadine_Richard@nightwellenterprise.com",
              "startDate" : "2016-07-22"
            }
          ]}/> 
        </div>
      </div>
    );
  }
}

export default Home;
