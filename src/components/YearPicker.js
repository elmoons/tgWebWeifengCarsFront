import { useState } from "react";

function YearPicker({ year, setYear }) {

    const [open, setOpen] = useState(false);

    const years = [];

    for (let y = 2026; y >= 2008; y--) {
        years.push(y);
    }

    return (

        <>
            <div
                className="input"
                onClick={() => setOpen(true)}
            >
                {year || "Выберите год"}
            </div>

            {open && (

                <div className="sheet">

                    <div className="sheet-content">

                        <div className="sheet-title">
                            Выберите год
                        </div>

                        {years.map((y) => (
                            <div
                                key={y}
                                className="sheet-item"
                                onClick={() => {
                                    setYear(y);
                                    setOpen(false);
                                }}
                            >
                                {y}
                            </div>
                        ))}

                    </div>

                </div>

            )}

        </>

    );

}

export default YearPicker;