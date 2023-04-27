import { Col, Row } from "react-bootstrap";
import DigitDropdown from "./DigitDropdown";
import React from "react";
import "./Components.css";

const DigitsInput = ({ onChange, onSubmit }) => {
    const colClass = "col-lg-3 col-md-6 col-12";
    const digitsNames = ["digit1", "digit2", "digit3", "digit4"];

    const getCols = () => {
        const tempCols = digitsNames.map((digit) => (
            <Col className={colClass} key={digit}>
                <DigitDropdown name={digit} onChange={onChange} />
            </Col>
        ));
        return <>{tempCols}</>;
    };

    const cols = getCols();

    return (
        <form onSubmit={onSubmit}>
            <Row>{cols}</Row>
            <Row>
                <Col>
                    <button className="btn btn-primary m-3" type="submit">
                        Ok
                    </button>
                </Col>
            </Row>
        </form>
    );
};

export default DigitsInput;