import { useState } from "react";
import { useNavigate } from "react-router-dom";
import YearPicker from "../components/YearPicker";
import MonthPicker from "../components/MonthPicker";
import Header from "../components/Header";
import Disclaimer from "../components/Disclaimer";

function Manual() {
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
                    className="input"
                    type="text"
                    placeholder="Введите цену"
                    value={formatNumber(price)}
                    onChange={(e) => {
                        const raw = parseNumber(e.target.value);

                        if (/^\d*$/.test(raw)) {
                            setPrice(raw);
                        }
                    }}
                />
                {errors.price && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.price}</div>}

                <p>Год производства</p>
                <YearPicker year={year} setYear={setYear} />
                {errors.year && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.year}</div>}

                <p>Месяц производства</p>
                <MonthPicker month={month} setMonth={setMonth} /> {/* <-- 3. вставка компонента */}
                {errors.month && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.month}</div>}

                <p>Объем двигателя (см³)</p>
                <input
                    className="input"
                    type="text"
                    placeholder="от 660 см³"
                    value={formatNumber(engine)}
                    onChange={(e) => {
                        const raw = parseNumber(e.target.value);

                        if (/^\d*$/.test(raw)) {
                            setEngine(raw);
                        }
                    }}
                />
                {errors.engine && <div style={{ color: "#ff5555", fontSize: "12px" }}>{errors.engine}</div>}

                <p>Коэффициент курса</p>
                <input
                    className="input"
                    type="text"
                    placeholder="1.02"
                    value={coef}
                    onChange={(e) => {
                        let val = e.target.value;

                        // убираем всё кроме цифр и точки
                        val = val.replace(/[^0-9.]/g, "");

                        // оставляем только одну точку
                        const parts = val.split(".");
                        if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                        }

                        // запрещаем точку первой
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
            </div>
        </div>
    );
}

export default Manual;