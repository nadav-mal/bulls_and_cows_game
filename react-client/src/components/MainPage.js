import React, { useState } from 'react';
import GameInputs from "./GameInputs";
import GuessesHistory from "./GuessesHistory";
import WinComponent from "./WinComponent";
import TopScores from "./TopScores";

const MainPage = ({setRandomVal, randomNum}) => {
    const [guesses, setGuesses] = useState([]);
    const [wonGame, setWonGame] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(true);
    const [scoresData, setScoresData] = useState([]);
    const [isBadResponse, setIsBadResponse] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState(0);
    const addGuess = (newGuess) => {
        setGuesses([newGuess, ...guesses]);
    };

    const handleNameSubmit = async () => {
        let scores = await getScores();
        setScoresData(scores);
        setNameSubmitted(true);
    };

    const handleBadResponse = (code, msg) => {
        setErrorStatusCode(`Error Code: ${code} \n Message: ${msg}`);
        console.log(msg);
        console.log(code);
        setIsBadResponse(true);
        setTimeout(() => setIsBadResponse(false), 5000);
    }

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