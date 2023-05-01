/**
 * Renders two buttons for starting a new game and showing the game rules.
 *
 * @param {function} onNewGameClick A callback function to handle when the "Start New Game" button is clicked.
 * @param {function} onShowRulesClick A callback function to handle when the "Show Rules" button is clicked.
 * @param {string} name The name to display on the "Show Rules" button.
 */
import { Row, Col } from "react-bootstrap";
import React from 'react';

const GameButtons = ({ onNewGameClick, onShowRulesClick, name }) => {
    return (
        <Row>
            <Col className="col-md-6">
                <button className="btn btn-primary m-3" onClick={onShowRulesClick}>
                    {name}
                </button>
            </Col>
            <Col className="col-md-6">
                <button className="btn btn-primary m-3" onClick={onNewGameClick}>Start New Game</button>
            </Col>
        </Row>
    );
}

export default GameButtons;
