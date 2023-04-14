function GameRules() {
    return (
        <textarea
            rows="9"
            cols="33"
            readOnly
            style={{ resize: 'none', userSelect: 'none', background:"tomato", marginBottom: '10px', backgroundColor:'#dde0ab'}}
            value=" The program generates a random number, while the player tries to guess it.
            The number to be guessed must be a 4 digit number, using digits from 0 to 9, each digit at most once.
            e.g. 1234 is valid, but 1233 is not valid.
            For every guess that the player makes, you display 2 values
                - The number of bulls and the number of cows.
                - 1 bull means the guess contains and the target number have 1 digit in common, and in the correct position.
                - 1 cow means the guess and the target have 1 digit in common, but not in correct position.
            For example if the number to guess is 1234. Guessing 4321 will give 0 bulls and 4 cows. 3241 will give 1 bull and 3 cows.
            4 bulls means that the user won the game."
        />
    );
}

export default GameRules;