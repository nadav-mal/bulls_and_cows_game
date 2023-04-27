
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import GameInputs from "./GameInputs";
import GuessesHistory from "./GuessesHistory";

const WinComponent = ({guesses}) => {
    const steps = `Your score is: ${guesses}`
    const WinComponentStyle = {
        backgroundColor: '#BBC',
        marginLeft: '0px'
};


    return <Col className={'col-12'} style={WinComponentStyle}>
        <Row>
            <h4>You won!</h4>
        </Row>
        <Row>
            <h5>{steps}</h5>
        </Row>
    </Col>

}

export default WinComponent