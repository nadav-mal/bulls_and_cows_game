import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const WinComponent = ({guesses, handleNameSubmit }) => {
    const [username, setUsername] = useState('');
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
        console.log(scores);

        // handle submit logic here
    };

    const postNewScore = () => {
        fetch(`${URL}?name=${username}&score=${guesses}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if(!response.ok){
                    throw new Error('something happen')
                }
                return response.json();
            })
            .then(data =>{
                console.log(`Name: ${data.name} , score: ${data.score} , msg: ${data.msg}`)
                handleNameSubmit();
            })
            .catch(error => {
                console.log(error);
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