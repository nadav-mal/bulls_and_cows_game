import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Title from "./components/Title";
import MainPage from "./components/MainPage"
import { Container, Row } from 'react-bootstrap';
import {useState} from "react";

/**
 This is the main component of the application. It renders the title and the main page component.
 It also manages the state for a randomly generated 4-digit number which is passed down to the main page component as a prop.
 */
function App() {

    /**
     The randomValue state is used to store a randomly generated 4-digit number. It is initialized using the
     getRandomValue function.
     */
    const [randomValue, setRandomValue] = useState(getRandomValue());
    /**
     The ContainerStyle object is used to define some styling properties for the Container component from react-bootstrap.
     */
    const ContainerStyle = {
        padding: '20px',
        marginTop: '5px'
    };
    /**
     The getRandomValue function generates a random 4-digit number with no repeating digits.
     @return {string} A string representing a 4-digit number with no repeating digits.
     */
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
