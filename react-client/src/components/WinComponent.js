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
        // handle submit logic here
    };

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