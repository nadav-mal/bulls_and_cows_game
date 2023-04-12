import React, { useState } from 'react';
import './Dropdown.css'; // import any styling for the dropdown here

const Dropdown = () => {
    const [selectedDigit, setSelectedDigit] = useState(null);

    const handleChange = (e) => {
        setSelectedDigit(e.target.value);
    };

    return (
        <div className="dropdown-container">
            <select className="dropdown" onChange={handleChange}>
                <option value="">Select a digit</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
        </div>
    );
};

export default Dropdown;