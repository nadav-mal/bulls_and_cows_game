
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import GameInputs from "./GameInputs";
import GuessesHistory from "./GuessesHistory";


const MainPage = ({getRandomNumber, randomNum}) => {
    const [guesses, setGuesses] = useState([]);

    const addGuess = (newGuess) => {
        setGuesses([newGuess, ...guesses]);
    };
    const compareNumbers = (randomNum, inputs) => {

        let cows = 0;
        let bulls = 0;
        const divisor = 10;
        let randNum = randomNum;
        let guess = '';

        for (let i = 0; i < Object.keys(inputs).length; i++) {
            let digitInCorrect = Math.floor(randNum % divisor);
            randNum = Math.floor(randNum / divisor);
            let digitName = "digit" + (4 - i);
            let digitInGuess = inputs[digitName];
            guess += digitInGuess.toString();

            if (digitInCorrect.toString() === digitInGuess) {
                bulls++;
            } else if (randomNum.toString().includes(digitInGuess)) {
                cows++;
            }
        }
        guess = guess.split("").reverse().join("");
        addGuess({guess,bulls,cows})
        return { bulls, cows };
    };


    return (
        <>
            <GameInputs numberGenerator={getRandomNumber} randomNum={randomNum} compareNumbers = {compareNumbers}/>
            <GuessesHistory guesses={guesses}/>
        </>
    )
}

export default MainPage;