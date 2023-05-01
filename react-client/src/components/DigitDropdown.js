import './Components.css'; // import any styling for the dropdown here

/**
 * The `DigitDropdown` component is a digit dropdown (picker) component
 * @param {Function} onChange - A function that is called whenever the user selects a digit from a dropdown.
 * @param {Function} onSubmit - A function that is called when the form is submitted.
 * @returns {JSX.Element} A React element representing the DigitsInput form.
 */
const DigitDropdown = ({ name, onChange }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        onChange(name, value);
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

export default DigitDropdown;
