import React from 'react';
import {Col, Row} from 'react-bootstrap';
import DigitGuesser from "./DigitGuesser";
import NewGameButton from "./NewGameButton";
import ToggleButton from "./ToggleButton";
const GameButtons = () => {
    return (
        <div>
            <Row>
                <Col>
                    <ToggleButton label="Game Rules" Component={<p> Game rules</p>}/>
                </Col>
                <Col>
                    <ToggleButton label="Start New Game" Component={ <DigitGuesser/> } />
                </Col>
            </Row>

        </div>
    );
};

export default GameButtons;