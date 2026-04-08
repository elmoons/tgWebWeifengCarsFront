import { useState } from "react";

const months = [
    { value: 1, label: "Январь" },
    { value: 2, label: "Февраль" },
    { value: 3, label: "Март" },
    { value: 4, label: "Апрель" },
    { value: 5, label: "Май" },
    { value: 6, label: "Июнь" },
    { value: 7, label: "Июль" },
    { value: 8, label: "Август" },
    { value: 9, label: "Сентябрь" },
    { value: 10, label: "Октябрь" },
    { value: 11, label: "Ноябрь" },
    { value: 12, label: "Декабрь" },
];

function MonthPicker({ month, setMonth, onOpen }) { // добавили onOpen
    const [open, setOpen] = useState(false);
    const selected = months.find(m => m.value === month);

    return (
        <div>
            <div
                className="input"
                onClick={() => {
                    setOpen(true);
                    if (onOpen) onOpen(); // скроллим к полю
                }}
                style={{ cursor: "pointer" }}
            >
                {selected ? selected.label : "Выберите месяц"}
            </div>

            {open && (
                <div className="sheet" onClick={() => setOpen(false)}>
                    <div className="sheet-content" onClick={(e) => e.stopPropagation()}>
                        <div className="sheet-title">Выберите месяц</div>
                        {months.map((m) => (
                            <div
                                key={m.value}
                                className="sheet-item"
                                onClick={() => {
                                    setMonth(m.value);
                                    setOpen(false);
                                }}
                            >
                                {m.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MonthPicker;