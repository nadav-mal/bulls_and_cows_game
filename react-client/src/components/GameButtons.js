import {Row, Col} from "react-bootstrap";
import React, { useState } from 'react';


const GameButtons = ({ onNewGameClick, onShowRulesClick, name }) => {
    return (
        <Row>
            <Col className="col-3">
                <button className="btn btn-primary m-3" onClick={onNewGameClick}>Start New Game</button>
            </Col>
            <Col className="col-9">
                <button className="btn btn-primary m-3" onClick={onShowRulesClick}>
                    {name}
                </button>
            </Col>
        </Row>
    );
}

export default GameButtons;