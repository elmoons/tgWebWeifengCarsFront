import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import YearPicker from "../components/YearPicker";
import MonthPicker from "../components/MonthPicker";
import Header from "../components/Header";
import Disclaimer from "../components/Disclaimer";

function Manual() {
    const priceRef = useRef(null);
    const engineRef = useRef(null);
    const coefRef = useRef(null);
    const yearRef = useRef(null);
    const monthRef = useRef(null);

    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState(null); // <-- 2. состояние месяца
    const [engine, setEngine] = useState("");
    const [coef, setCoef] = useState("1.02");
    const [errors, setErrors] = useState({});
    const currentYear = new Date().getFullYear();

    const formatNumber = (value) => {
        if (!value) return "";
        return Number(value).toLocaleString("en-US");
    };

    const parseNumber = (value) => {
        return value.replace(/,/g, "");
    };

    const handleCalc = () => {
        const newErrors = {};

        if (!price) newErrors.price = "Цена автомобиля обязательна для заполнения";
        else if (Number(price) <= 0) newErrors.price = "Цена автомобиля должна быть больше 0";

        if (!year) newErrors.year = "Год производства обязателен для заполнения";
        else if (year < 2008 || year > currentYear)
            newErrors.year = `Год производства должен быть в диапазоне от 2008 до ${currentYear}`;

        if (!month) newErrors.month = "Месяц производства обязателен для заполнения"; // <-- валидация месяца

        if (!engine) newErrors.engine = "Объем двигателя обязателен для заполнения";

        else if (Number(engine) < 660)
            newErrors.engine = "Объем двигателя должен быть не менее 660 см³";

        if (!coef) newErrors.coef = "Коэффициент обязателен для заполнения";
        else if (Number(coef) <= 0) newErrors.coef = "Коэффициент должен быть больше 0";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/result", { state: { price, year, month, engine, coef } });
        }
    };

    return (
        <div className="container">
            <Header title="Ручной расчет" />
            <div className="card">
                <h3>Данные автомобиля</h3>

                <p>Цена автомобиля (CNY)</p>
                <input
                    ref={priceRef}
                    className="input"
                    type="text"
                    placeholder="Введите цену"
                    value={formatNumber(price)}
                    onFocus={() => priceRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                    onChange={(e) => {
                        const raw = parseNumber(e.target.value);
                        if (/^\d*$/.test(raw)) setPrice(raw);
                    }}
                />

                {errors.price && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.price}</div>}

                <p>Год производства</p>
                <div ref={yearRef}>
                    <YearPicker
                        year={year}
                        setYear={setYear}
                        onOpen={() => yearRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                    />
                </div>
                {errors.year && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.year}</div>}

                <p>Месяц производства</p>
                <div ref={monthRef}>
                    <MonthPicker
                        month={month}
                        setMonth={setMonth}
                        onOpen={() => monthRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                    />
                </div>
                {errors.month && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.month}</div>}

                <p>Объем двигателя (см³)</p>
                <input
                    ref={engineRef}
                    className="input"
                    type="text"
                    placeholder="от 660 см³"
                    value={formatNumber(engine)}
                    onFocus={() => engineRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                    onChange={(e) => {
                        const raw = parseNumber(e.target.value);
                        if (/^\d*$/.test(raw)) setEngine(raw);
                    }}
                />
                {errors.engine && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.engine}</div>}

                <p>Коэффициент курса</p>
                <input
                    ref={coefRef}
                    className="input"
                    type="text"
                    placeholder="1.02"
                    value={coef}
                    onFocus={() => coefRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}
                    onChange={(e) => {
                        let val = e.target.value;
                        val = val.replace(/[^0-9.]/g, "");
                        const parts = val.split(".");
                        if (parts.length > 2) val = parts[0] + "." + parts.slice(1).join("");
                        if (val.startsWith(".")) return;
                        setCoef(val);
                    }}
                />
                {errors.coef && (
                    <div style={{ color: "#ff5555", fontSize: "12px" }}>
                        {errors.coef}
                    </div>
                )}
                <button className="button" onClick={handleCalc}>
                    Рассчитать стоимость
                </button>
                <Disclaimer />
                <button
                    className="button-outline"
                    onClick={() => window.open("https://t.me/Weifeng_Sergei", "_blank")}
                    style={{ marginTop: "15px" }}
                >
                    Связаться с менеджером
                </button>
            </div>
        </div>
    );
}

export default Manual;