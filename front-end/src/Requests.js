import React from 'react';
import { Form, FormControl, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Dropdown from 'react-bootstrap/Dropdown'

import './App.css';

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Requesting an Employee</Popover.Title>
    <Popover.Content>
      When you request a transfer of an employee, you, as their new manager, as well as their existing manager must both approve.
  </Popover.Content>
  </Popover>
);
const popoverManage = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Managing Requests</Popover.Title>
    <Popover.Content>
      Here you can see any pending employee requests.
  </Popover.Content>
  </Popover>
);
const NewRequest = () => (
  <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
    <h2 className="request-text">Create a new Request</h2>
  </OverlayTrigger>
);
const ManageRequests = () => (
  <OverlayTrigger trigger="hover" placement="left" overlay={popoverManage}>
    <h2 className="request-text">Manage Existing Requests</h2>
  </OverlayTrigger>
);

const namesList = [
  {
    id: 1,
    value: 'John Doe'
  }, {
    id: 2,
    value: 'John Smith'
  }, {
    id: 3,
    value: 'Jane Marie'
  }, {
    id: 4,
    value: 'Jane Thomas'
  }
];

// generage select dropdown option list dynamically
function Options({ options }) {
  return (
    options.map(option =>
      <Dropdown.Item eventKey={option.id}>{option.value}</Dropdown.Item>)
  );
}

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = React.useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

function Requests() {
  return (
    <div>
      <h1 className="home-text">
        Requests
      </h1>
      <Container>
        <Row>
          <Col xs={10} md={7}>
            <br></br>
            <br></br>
            <div>
              <NewRequest />
              <br></br>
              Select an Employee
              <Dropdown>
                <Dropdown.Toggle style={{ width: '19rem' }} variant="secondary" id="dropdown-custom-components">
                  Select an Employee
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  <Options options={namesList} />
                </Dropdown.Menu>
              </Dropdown>
              <br></br>
              <Form>
                <Form.Label>Or Enter Employee Name</Form.Label>
                <Row>
                  <Col>
                    <Form.Control placeholder="First name" />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Last name" />
                  </Col>
                </Row>
              </Form>
              <br></br>
              <Form>
                <br></br>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Place any comments for this employees current manager here</Form.Label>
                  <Form.Control as="textarea" rows="3" placeholder="additional comments" />
                </Form.Group>
              </Form>
            </div>
            <br></br>
            <Button variant="outline-secondary" size="lg" block>
              Submit
            </Button>
          </Col>
          <Col xs={6} md={5}>
            <br></br>
            <br></br>
            <ManageRequests />
            <br></br>
            <CardDeck>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Transfer Request</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Employee Name</Card.Subtitle>
                  <Card.Text>
                    (Manager Name) has requested your employee, (Employee Name), be transfered to his team.
                </Card.Text>
                  <Card.Link href="#">Accept</Card.Link>
                  <Card.Link href="#">Decline</Card.Link>
                </Card.Body>
              </Card>
            </CardDeck>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Requests;


