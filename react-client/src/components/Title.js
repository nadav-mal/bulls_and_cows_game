import {Row} from 'react-bootstrap';
function Title() {
    const titleStyle = {
        backgroundImage: 'url(logo512.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        color: 'beige',
        padding: '20px',
        textAlign: 'center',
    };

    return (
        <Row>
            <div style={titleStyle}>
                <h1>Bulls and Cows</h1>
            </div>
        </Row>
    );
}

export default Title;