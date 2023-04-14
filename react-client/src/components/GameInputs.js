import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import DigitsInput from "./DigitsInput";
import GameButtons from "./GameButtons";
import GameRules from "./GameRules";

function GameInputs({ numberGenerator, randomNum, compareNumbers }) {
    // all form inputs are stored in this state
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState('Your history of guesses will appear below:');

    // Buttons states
    const [gameStarted, setGameStarted] = useState(true);
    const [showRules, setShowRules] = useState(false);


    const handleChange = (name, value) => {
        if (value === "") {
            setInputs(prevInputs => {
                const newInputs = {...prevInputs};
                delete newInputs[name];
                return newInputs;
            });
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const size = Object.keys(inputs).length;
        if (size < 4) {
            setResult(JSON.stringify("Please enter all 4 digits."));
        } else {
            const { bulls, cows } = compareNumbers(randomNum,inputs);
            //if(bulls === 4) win game;

            setResult(
                "Cows: " +
                JSON.stringify(cows) +
                "\nBulls: " +
                JSON.stringify(bulls)
            );
        }
    };



    const handleNewGameClick = () => {
        setInputs({});
        setResult('');
        setGameStarted(true);
    };

    const handleShowRulesClick = () => {
        setShowRules(prevShowRules => !prevShowRules);
    };

    return (
        <Col>
            <Row>
                    {showRules ? <GameButtons
                            onNewGameClick={handleNewGameClick}
                            onShowRulesClick={handleShowRulesClick}
                            name="Hide Rules" />
                        : <GameButtons
                            onNewGameClick={handleNewGameClick}
                            onShowRulesClick={handleShowRulesClick}
                            name="Show Rules" />
                    }
            </Row>
            <Row>
                {showRules ? <GameRules /> : null}
                {gameStarted ? <DigitsInput onChange={handleChange} onSubmit={handleSubmit} /> : null}

                {result ? <div className="border p-3">{result}</div> : ""}
            </Row>
        </Col>
    );
}

export default GameInputs;
