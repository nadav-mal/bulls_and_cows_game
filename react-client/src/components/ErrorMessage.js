import React from 'react';
import './Components.css';
/**
 * The `ErrorMessage` component is used to display error messages from network calls (backend errors)
 * @returns {JSX.Element} A React element representing the DigitsInput form.
 */
const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <span className="error-icon">&#x26A0;</span>
            <p className="error-text">{message}</p>
        </div>
    );
};

export default ErrorMessage;
