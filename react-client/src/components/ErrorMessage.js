import React from 'react';
import './Components.css';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <span className="error-icon">&#x26A0;</span>
            <p className="error-text">{message}</p>
        </div>
    );
};

export default ErrorMessage;
