import React from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap'

function LoginForm() {
    return (
        <>
            <Form className="mx-5 p-3" style={{border:"1px solid #C0C0C0"}}>
                <Form.Group controlId="formID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID"></Form.Control>
                </Form.Group>
                <Form.Group controlId="formPass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                </Form.Group>
                <Button href = "/" variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </>
    )

}

export default LoginForm; 