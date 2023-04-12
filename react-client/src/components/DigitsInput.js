import {Col, Row} from "react-bootstrap";
import DigitDropdown from "./DigitDropdown";
import React from "react";
import './Components.css'; // import any styling for the dropdown here

const DigitsInput = ({ onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <Row>
                <Col>
                    <DigitDropdown name="digit1" onChange={onChange}/>
                </Col>
                <Col>
                    <DigitDropdown name="digit2" onChange={onChange}/>
                </Col>
                <Col>
                    <DigitDropdown name="digit3" onChange={onChange}/>
                </Col>
                <Col>
                    <DigitDropdown name="digit4" onChange={onChange}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button className="btn btn-primary m-3" type="submit">Ok</button>
                </Col>
            </Row>
        </form>
    )
}

export default DigitsInput;