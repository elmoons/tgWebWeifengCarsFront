import { useState, useEffect } from "react";

function NumberInput({ value, onChange, placeholder }) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (value !== undefined && value !== null && value !== "") {
            setDisplay(Number(value).toLocaleString("en-US"));
        }
    }, [value]);

    const handleChange = (e) => {
        let raw = e.target.value.replace(/,/g, "");

        if (/^\d*$/.test(raw)) {
            setDisplay(raw === "" ? "" : Number(raw).toLocaleString("en-US"));
            onChange(raw);
        }
    };

    return (
        <input
            type="text"
            value={display}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

export default NumberInput;