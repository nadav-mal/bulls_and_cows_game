import React, { useState } from "react";

function ToggleButton({ Component }) {
    const [isHidden, setIsHidden] = useState(false);

    const handleClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div>
            <button onClick={handleClick}>Toggle Component</button>
            {!isHidden && <Component />}
        </div>
    );
}
export default ToggleButton;