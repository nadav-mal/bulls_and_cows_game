import  {Col,Row} from 'react-bootstrap';
import DigitDropdown from "./DigitDropdown";

function digitDropdown() {
    return (
        <Row>
            <Col>
                <DigitDropdown/>
            </Col>
            <Col>
                <DigitDropdown/>
            </Col>
            <Col>
                <DigitDropdown/>
            </Col>
            <Col>
                <DigitDropdown/>
            </Col>
        </Row>
    );
}

export default digitDropdown;