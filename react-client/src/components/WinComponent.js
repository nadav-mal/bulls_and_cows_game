import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Components.css';
import ErrorMessage from "./ErrorMessage";
const WinComponent = ({guesses, handleNameSubmit, handleBadResponse, isBadResponse, errorStatusCode  }) => {
    const [username, setUsername] = useState('');
    const steps = `Your score is: ${guesses}`
    const URL = '/java_react_war/api/highscores'


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        //setNameSubmitted(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        postNewScore();
    };

    const postNewScore = () => {
        fetch(`${URL}?name=${username}&score=${guesses}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log("in here");
                    response.json()
                        .then(data => {
                            handleBadResponse(response.status, data.error); })
                        .catch(() =>{
                            handleBadResponse(500, "Connection with the server is bad");
                        });
                }
                else handleNameSubmit();
            }).catch(() => {
                handleBadResponse(450, "An unexpected runtime error");
            });
    };



    return (
        <Col className="win-component col-12">
            <Row className="win-header">
                <h4>You Won!</h4>
            </Row>
            <Row className="win-steps">
                <h5>{steps}</h5>
            </Row>
            <Form onSubmit={handleSubmit} className="win-form">
                <Form.Group>
                    <Col>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} className="win-input" />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col>
                        <Button variant="primary" type="submit" className="win-button">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
            {isBadResponse ? <ErrorMessage message={errorStatusCode}/> : null }
        </Col>
    );
};

export default WinComponent;