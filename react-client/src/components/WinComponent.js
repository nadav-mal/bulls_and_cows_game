import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Components.css';

const WinComponent = ({guesses, handleNameSubmit }) => {
    const [username, setUsername] = useState('');

    const steps = `Your score is: ${guesses}`;
    const URL = '/java_react_war/api/highscores';

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
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
                    throw new Error('Something happened');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Name: ${data.name}, score: ${data.score}, msg: ${data.msg}`);
                handleNameSubmit();
            })
            .catch(error => {
                console.log(error);
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
        </Col>
    );
};

export default WinComponent;
