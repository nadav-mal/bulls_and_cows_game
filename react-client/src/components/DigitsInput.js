import { Col, Row } from "react-bootstrap";
import DigitDropdown from "./DigitDropdown";
import React from "react";
import "./Components.css";
/**
 * The `DigitsInput` component is a form for entering a four-digit number using dropdowns.
 *
 * @param {Function} onChange - A function that is called whenever the user selects a digit from a dropdown.
 * @param {Function} onSubmit - A function that is called when the form is submitted.
 */

const DigitsInput = ({ onChange, onSubmit }) => {
    const colClass = "col-lg-3 col-md-6 col-12";
    const digitsNames = ["digit1", "digit2", "digit3", "digit4"];


    /**
     Returns an array of Bootstrap Col components, each containing a DigitDropdown component.
     The DigitDropdown component receives a name property (the name of the digit) and an onChange property (a callback function).
     The digit names are specified in the digitsNames array, and the class name for each Col component is specified in the colClass variable.
     */
    const getCols = () => {
        const tempCols = digitsNames.map((digit) => (
            <Col className={colClass} key={digit}>
                <DigitDropdown name={digit} onChange={onChange}/>
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