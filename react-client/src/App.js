import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MainPage from "./components/MainPage";
import Title from "./components/Title";

function App() {
    const randomNum = getRandomNumber();
    console.log(randomNum);

    function getRandomNumber() {
        const digits = [];

        while (digits.length < 4) {
            const randomDigit = Math.floor(Math.random() * 10);

            if (!digits.includes(randomDigit)) {
                digits.push(randomDigit);
            }
        }

        return digits.join('');
    }

    return (
        <div className="App">
            <Title />
            <MainPage numberGenerator={getRandomNumber} randomNum={randomNum} />
        </div>
    );
}

export default App;
