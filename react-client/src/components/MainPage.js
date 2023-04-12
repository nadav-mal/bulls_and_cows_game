import React, { useState } from 'react';
import  DigitGuesser from "./DigitGuesser";
import  ButtonsRow from "./ButtonsRow";
import { Container, Button } from 'react-bootstrap';

function MainPage() {
    // all form inputs are stored in this state
    const [inputs, setInputs] = useState({});

    const [result, setResult] = useState('');

    /**
     * Handle input change in the form. Note that the name of the input
     * is used to determine which state to update but no hard-coding is
     * required.
     * @param event
     */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // the expression [name] is evaluated to the value of the variable name
        // note that the square brackets [] do not denote an array!
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(JSON.stringify(inputs)); // for demonstration purposes only
    }

    return (
        <Container>
            <ButtonsRow/>

            <form onSubmit={handleSubmit}>
                <button className="btn btn-primary m-3" type="submit">Submit</button>
                {result ? <div className="border p-3">Result is {result}</div> : ""}
            </form>
        </Container>
    )
}

export default MainPage;