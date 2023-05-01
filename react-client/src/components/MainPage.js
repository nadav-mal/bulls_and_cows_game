import React, { useState } from 'react';
import GameInputs from "./GameInputs";
import GuessesHistory from "./GuessesHistory";
import WinComponent from "./WinComponent";
import TopScores from "./TopScores";


/**
 React component that represents the main page of the Bulls and Cows game.
 @param {function} setRandomVal - Setter function to set the new random value for the game.
 @param {number} randomNum - The random number generated for the game.
 @returns {JSX.Element} - React component that represents the main page of the Bulls and Cows game.
 */
const MainPage = ({setRandomVal, randomNum}) => {
    const [guesses, setGuesses] = useState([]);
    const [wonGame, setWonGame] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(true);
    const [scoresData, setScoresData] = useState([]);
    const [isBadResponse, setIsBadResponse] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState(0);

    /**
     A function that adds a new guess to the list of guesses made during the game.
     @param {Object} newGuess - An object containing information about the new guess made by the user.
     @param {string} newGuess.guess - The new guess made by the user.
     @param {number} newGuess.bulls - The number of bulls in the new guess.
     @param {number} newGuess.cows - The number of cows in the new guess.
     */
    const addGuess = (newGuess) => {
        setGuesses([newGuess, ...guesses]);
    };
    /**
     * Not much to explain here (just updating states after a fetch request)
     */
    const handleNameSubmit = async () => {
        let scores = await getScores();
        setScoresData(scores);
        setNameSubmitted(true);
    };

    /**
     A function that handles bad responses from the server by setting the error status code, logging the error message and code to the console, and setting the isBadResponse state to true for 5 seconds.
     @param {number} code - The error code returned by the server.
     @param {string} msg - The error message returned by the server.
     */
    const handleBadResponse = (code, msg) => {
        setErrorStatusCode(`Error Code: ${code} \n Message: ${msg}`);
        console.log(msg);
        console.log(code);
        setIsBadResponse(true);
        setTimeout(() => setIsBadResponse(false), 5000);
    }

    /**
     A function that retrieves the high scores data from the server.
     @returns {Promise<Object[]>} - A promise that resolves with an array of high scores objects or null if an error occurs.
     */
    const  getScores = async () => {
        let data = await fetch('/java_react_war/api/highscores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('something happen')
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log(error);
            });
        return data !== undefined ? data : null;
    }


    /**

     A function that compares the user's input to the random number generated for the game and updates the bulls and cows counts accordingly.
     @param {number} randomNum - The random number generated for the game.
     @param {Object} inputs - An object containing the user's guess. [input1,...,input4] as indices
     @returns {Object} - An object containing the number of bulls and cows in the user's guess.
     */
    const compareNumbers = (randomNum, inputs) => {
        let cows = 0;
        let bulls = 0;
        const divisor = 10;
        let randNum = randomNum;
        let guess = '';
        for (let i = 0; i < Object.keys(inputs).length; i++) {
            let digitInCorrect = Math.floor(randNum % divisor);
            randNum = Math.floor(randNum / divisor);
            let digitName = "digit" + (4 - i); //As explained above
            let digitInGuess = inputs[digitName];
            guess += digitInGuess.toString();

            if (digitInCorrect.toString() === digitInGuess) {
                bulls++;
            } else if (randomNum.toString().includes(digitInGuess)) {
                cows++;
            }
        }
        guess = guess.split("").reverse().join("");
        addGuess({ guess, bulls, cows })
        return { bulls, cows };
    };

    return (
        <>
            <GameInputs
                randomNum={randomNum}
                compareNumbers = {compareNumbers}
                setWonGame = {setWonGame}
                setGuessesNum={setGuesses}
                setNewValue = {setRandomVal}
                setNameSubmitted = {setNameSubmitted}

            />
            {
                (wonGame && !nameSubmitted) ? <WinComponent
                    guesses={guesses.length}
                    handleNameSubmit={handleNameSubmit}
                    handleBadResponse={handleBadResponse}
                    isBadResponse={isBadResponse}
                    errorStatusCode={errorStatusCode}
                /> : null
            }
            {
                (wonGame && nameSubmitted) ? <TopScores scores={scoresData}/> : null
            }
            {
                !wonGame ? <GuessesHistory guesses={guesses}/> : null
            }
        </>
    )
}

export default MainPage;