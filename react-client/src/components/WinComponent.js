import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Components.css';

const WinComponent = ({guesses, handleNameSubmit }) => {
    const [username, setUsername] = useState('');
    const [isBadResponse, setIsBadResponse] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState(0);
    const steps = `Your score is: ${guesses}`
    const URL = '/java_react_war/api/highscores'

    let scores = ''
        const WinComponentStyle = {
            backgroundColor: '#BBC',
            marginLeft: '0px'
        };

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
                if (!response.ok)
                {
                    setIsBadResponse(true);
                    response.json().then(data => {
                        setErrorStatusCode(`Error Code: ${response.status}, Message: ${data.error}`);
                    });
                    setTimeout(() => setIsBadResponse(false), 5000);
                    throw new Error();
                }
                else
                    handleNameSubmit();
            }).catch(e => {
                console.log("cought in post");
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
            {isBadResponse ? <p>{errorStatusCode}</p> : null }
        </Col>
    );
};

export default WinComponent;