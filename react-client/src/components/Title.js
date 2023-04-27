import { Row, Col } from 'react-bootstrap';

function Title() {
    const divStyle = {
        backgroundImage: 'url(BullsCowsImg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        height: '30vh',
        color: 'beige',
        padding: '20px',
        textAlign: 'center'
    };
    const titleStyle = {
        marginTop: '110px',
        fontSize: '5rem', // Add this line to increase the font size
        fontFamily: 'cursive', // Add this line to set a fancy font
        textShadow: '2px 2px 5px black', // Add this line to add a text shadow
    }

    const smallScreenTitleStyle = {
        ...titleStyle,
        fontSize: '2rem',
    }

    return (
        <div className="d-flex flex-column" style={divStyle}>
            <Row className="flex-grow-1">
                <Col className={'col-md-12'}>
                    <h1 className="d-none d-md-block" style={titleStyle}>Bulls and Cows</h1>
                    <h1 className="d-block d-md-none" style={smallScreenTitleStyle}>Bulls and Cows</h1>
                </Col>
            </Row>
        </div>
    );
}

export default Title;
