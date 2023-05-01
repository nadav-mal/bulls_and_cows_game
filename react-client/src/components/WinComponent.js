import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Components.css';
import ErrorMessage from "./ErrorMessage";

/**
 * A React component that displays a form for submitting a score and username after winning the game.
 *
 * @param {number} guesses The number of guesses it took to win the game.
 * @param {function} handleNameSubmit A callback function to handle when the user submits their username.
 * @param {function} handleBadResponse A callback function to handle when there is a bad response from the server.
 * @param {boolean} isBadResponse A boolean that indicates whether there is a bad response from the server.
 * @param {string} errorStatusCode The error message to display when there is a bad response from the server.
 * @returns {JSX.Element} A React component that displays a form for submitting a score and username.
 */
const WinComponent = ({ guesses, handleNameSubmit, handleBadResponse, isBadResponse, errorStatusCode }) => {
    const [username, setUsername] = useState('');
    const steps = `Your score is: ${guesses}`
    const URL = '/java_react_war/api/highscores'

    /**
     * Handles changes to the input field for the username.
     *
     * @param {Object} event The event object representing the change in the input field.
     */
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    /**
     * Handles the submission of the form for submitting the score and username.
     *
     * @param {Object} event The event object representing the submission of the form.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        postNewScore();
    };

    /**
     * Sends a POST request to the server to submit the score and username.
     */
    const postNewScore = () => {
        fetch(`${URL}?name=${username}&score=${guesses}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    response.json()
                        .then(data => {
                            handleBadResponse(response.status, data.error);
                        })
                        .catch(() => {
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
