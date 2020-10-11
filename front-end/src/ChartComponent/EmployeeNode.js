import React from 'react';
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

function EmployeeNode() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        return (

            <div>
            <Card className = "employee-node" border="success" onClick={handleShow}>
                <Card.Body>FirstName LastName</Card.Body>
            </Card>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>FirstName LastName</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>ID: </ListGroup.Item>
                    <ListGroup.Item>Email: </ListGroup.Item>
                    <ListGroup.Item>Manager: </ListGroup.Item>
                    <ListGroup.Item>Project: </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Request Transfer
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        );
    }

export default EmployeeNode;