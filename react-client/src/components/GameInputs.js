import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import DigitsInput from "./DigitsInput";
import GameButtons from "./GameButtons";
import GameRules from "./GameRules";
/**
 * The `GameInputs` component is the first page component which contains all inputs by the user.
 * He also receives all states which help him manage screens replacement and renders
 * @param {Function} onChange - A function that is called whenever the user selects a digit from a dropdown.
 * @param {Function} onSubmit - A function that is called when the form is submitted.
 * @returns {JSX.Element} A React element representing the DigitsInput form.
 */
function GameInputs({randomNum, compareNumbers, setWonGame, setGuessesNum, setNewValue, setNameSubmitted }) {
    // all form inputs are stored in this state
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState('Your history of guesses will appear below:');

    // Buttons states
    const [gameStarted, setGameStarted] = useState(true);
    const [showRules, setShowRules] = useState(false);


    /**
     The handleChange function is an event handler that is called when the user selects a digit from a dropdown.
     @param {string} name - The name of the dropdown.
     @param {string} value - The selected value.
     @returns {void}
     The function updates the inputs state based on the selected value. If the selected value is empty,
     it deletes the corresponding key from the inputs object. Otherwise, it adds or updates the key-value pair
     in the inputs object. This function is used in the GameInputs component to manage user inputs.
     */
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
    /**
     Event handler for submitting a guess.
     @param {Event} event - The submit event.
     @returns {void}
     Validates the user input and updates the result state with the number of bulls and cows.
     If the user guesses the correct number, the handleWin function is called.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const size = Object.keys(inputs).length;
        if (size < 4) {
            setResult(JSON.stringify("Please enter all 4 digits."));
        } else {
            if(validateInput(inputs)) {
                const { bulls, cows } = compareNumbers(randomNum,inputs);
                if(bulls === 4) handleWin();
                else updateResult(bulls, cows);
            }
            else setResult(JSON.stringify("All 4 digits must be unique."));
        }
    };

    //Updating results string to the state which is later shown
    const updateResult = (bulls, cows) => {
        setResult(
            "Cows: " + JSON.stringify(cows) +
            "\nBulls: " + JSON.stringify(bulls)
        );
    }
    //Handling all states to get them back to their initial state
    const handleWin = () => {
        setResult(null);
        setWonGame(true);
        setGameStarted(false);
        setNameSubmitted(false);
    }
    /**
     * An O(n) solution to make sure that no digit appears twice
     * @param inputs - Input components
     * @returns {boolean} If a digit was inserted twice
     */
    const validateInput = (inputs) => {
        const digits = new Array(10).fill(false);

        for (let i = 0; i < Object.keys(inputs).length; i++) {
            let digitName = "digit" + (4 - i);
            let digitInGuess = inputs[digitName];
            if(digits[digitInGuess] === false)
                digits[digitInGuess] = true;
            else return false;
        }

        return true;
    };
    /** Returning all states to handle a user's click on the new game btn
     */
    const handleNewGameClick = () => {
        setInputs({});
        setResult('');
        setWonGame(false);
        setGuessesNum([]);
        setGameStarted(true);
        setNewValue();
    };
    /** Handling a user's click on the showRules btn (It's a toggle)
     */
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

                {result ? <div
                    style={{ backgroundColor:'#dde0ab', borderRadius:'20px', padding:'15px' }}
                >{result}</div> : ''}
            </Row>
        </Col>
    );
}

export default GameInputs;
