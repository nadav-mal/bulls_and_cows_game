import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import GameInputs from "./GameInputs";
import GuessesHistory from "./GuessesHistory";

const WinComponent = ({guesses}) => {
    const [username, setUsername] = useState('');
    const steps = `Your score is: ${guesses}`
        const WinComponentStyle = {
            backgroundColor: '#BBC',
            marginLeft: '0px'
        };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postNewScore(event.target.value, guesses);
        console.log(event.target.value);
        console.log(guesses)
        // handle submit logic here
    };

    const postNewScore = (name, score) => {
        fetch('/java_react_war/api/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                score: score
            })
        })
            .then(response => {
                // handle the response
            })
            .catch(error => {
                // handle the error
            });
    }

    return (
        <Col className={'col-12'} style={WinComponentStyle}>
            <Row>
                <h4>You won!</h4>
            </Row>
            <Row>
                <h5>{steps}</h5>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Col>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                    </Col>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Col>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Col>
    );
};

export default WinComponent;