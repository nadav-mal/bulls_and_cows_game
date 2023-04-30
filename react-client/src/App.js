import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import GameInputs from "./components/GameInputs";
import Title from "./components/Title";
import MainPage from "./components/MainPage"
import { Container, Row } from 'react-bootstrap';
import {useState} from "react";

function App() {
    const [randomValue, setRandomValue] = useState(getRandomValue());
    //updateRandomValue();
    const ContainerStyle = {
        padding: '20px',
        marginTop: '5px'
    };
    //const randomNum = getRandomNumber();
    console.log(randomValue);
    function getRandomValue() {
        const digits = [];

        while (digits.length < 4) {
            const randomDigit = Math.floor(Math.random() * 10);

            if (!digits.includes(randomDigit)) {
                digits.push(randomDigit);
            }
        }
        return digits.join('');
    }
    function updateValue() {
        const randomVal = getRandomValue()
        setRandomValue(randomVal);
    }

    return (
        <div className="App">
            <Container style={ContainerStyle}>
                <Title/>
                <Row>
                   <MainPage setRandomVal={updateValue} randomNum={randomValue}/>
                </Row>

            </Container>
        </div>
    );
}

export default App;
