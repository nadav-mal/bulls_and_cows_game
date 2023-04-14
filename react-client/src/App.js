import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import GameInputs from "./components/GameInputs";
import Title from "./components/Title";
import MainPage from "./components/MainPage"
import { Container, Row } from 'react-bootstrap';

function App() {
    const ContainerStyle = {
        padding: '20px',
        marginTop: '50px'
    };
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
            <Container style={ContainerStyle}>
                <Title/>
                <Row>
                   <MainPage getRandomNumber={getRandomNumber} randomNum={randomNum}/>
                </Row>

            </Container>
        </div>
    );
}

export default App;
