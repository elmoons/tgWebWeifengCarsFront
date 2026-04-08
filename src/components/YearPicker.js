import { useState } from "react";

function YearPicker({ year, setYear, onOpen }) { // добавили onOpen

    const [open, setOpen] = useState(false);

    const years = [];
    for (let y = 2026; y >= 2008; y--) years.push(y);

    return (
        <>
            <div
                className="input"
                onClick={() => {
                    setOpen(true);
                    if (onOpen) onOpen(); // скроллим к полю
                }}
            >
                {year || "Выберите год"}
            </div>

            {open && (
                <div
                    className="sheet"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="sheet-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sheet-title">Выберите год</div>
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