import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import DigitsInput from "./DigitsInput";
import GameButtons from "./GameButtons";
import GameRules from "./GameRules";

function MainPage({ numberGenerator, randomNum }) {
    // all form inputs are stored in this state
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState('');

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
            const { bulls, cows } = compareNumbers();
            //if(bulls === 4) win game;

            setResult(
                "Cows: " +
                JSON.stringify(cows) +
                "\nBulls: " +
                JSON.stringify(bulls)
            );
        }
    };

    const compareNumbers = () => {
        let cows = 0;
        let bulls = 0;
        const divisor = 10;
        let randNum = randomNum;
        for (let i = 0; i < Object.keys(inputs).length; i++) {
            let digitInCorrect = Math.floor(randNum % divisor);
            randNum = Math.floor(randNum / divisor);
            let digitName = "digit" + (4 - i);
            let digitInGuess = inputs[digitName];

            if (digitInCorrect.toString() === digitInGuess) {
                bulls++;
            } else if (randomNum.toString().includes(digitInGuess)) {
                cows++;
            }
        }
        return { bulls, cows };
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
        <Container>
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
        </Container>
    );
}

export default MainPage;
