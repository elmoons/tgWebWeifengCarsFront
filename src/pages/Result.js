import Header from "../components/Header";
import Disclaimer from "../components/Disclaimer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRates } from "../utils/currency";
import ResultRow from "../components/ResultRow";
import { calculate } from "../utils/calc";
import {CONFIG} from "../utils/config";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { price, year, month, engine, coef } = location.state || {};
    const [rates, setRates] = useState(null);

    useEffect(() => {
        async function loadRates() {
            const r = await getRates();
            setRates(r);
        }
        loadRates();
    }, []);

    if (!rates) return <div className="container">Загрузка...</div>;

    const result = calculate(
        {
            priceCNY: Number(price),
            engine: Number(engine),
            year: Number(year),
            month: Number(month),
            coef: Number(coef) || 1.02
        },
        rates
    );
    const safeCoef = Number(coef) || 1.02;
    const bankPercent = (safeCoef - 1) * 100;
    const percentLabel =
        bankPercent === 0
            ? "без комиссии"
            : `${bankPercent > 0 ? "+ " : ""}${bankPercent.toFixed(2)}% комиссия банка`;
    const cnyRub = rates.CNY * safeCoef;
    const eurRub = rates.EUR;

    return (
        <div className="container">
            {/* Стрелка назад + заголовок */}
            <Header title="Ручной расчет" />

            <div className="card">
                {/* Год + месяц производства */}
                <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "10px" }}>
                    Год выпуска: {year}-{month ? month.toString().padStart(2, "0") : "--"}
                </div>

                <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
                    Конечная стоимость в Уссурийске
                </div>
                <div style={{ fontSize: "20px", marginBottom: "15px" }}>
                    {result.total.toLocaleString()} ₽
                </div>

                <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Расходы</div>

                <ResultRow
                    title="Стоимость автомобиля"
                    subtitle="Расчётная цена"
                    value={`${Number(price).toLocaleString()} ¥`}
                />

                <ResultRow
                    title="Расходы по Китаю"
                    subtitle="Экспортные расходы и доставка"
                    value={`${result.chinaLogistics.toLocaleString()} ¥`}
                />

                <ResultRow
                    title="Стоимость SWIFT"
                    subtitle="Комиссии за международные переводы"
                    value={`${result.swiftCNY.toLocaleString()} ¥`}
                />

                <ResultRow
                    title="Таможенная пошлина"
                    subtitle="Расчёт по ФТС"
                    value={`${result.dutyRub.toLocaleString()} ₽`}
                />

                <ResultRow
                    title="Таможенный сбор"
                    subtitle="Фиксированный сбор"
                    value={`${result.customsFee.toLocaleString()} ₽`}
                />

                <ResultRow
                    title="Утилизационный сбор"
                    subtitle="Экологический сбор"
                    value={`${result.recyclingFee.toLocaleString()} ₽`}
                />

                <ResultRow
                    title="Расходы по России"
                    subtitle="СВХ, брокер, СБКТС, ЭПТС"
                    value={`${CONFIG.fixed_costs.russia_costs_rub.toLocaleString()} ₽`}
                />

                <ResultRow
                    title="Комиссия компании"
                    subtitle="Фиксированная комиссия"
                    value={`${result.companyCommission.toLocaleString()} ₽`}
                />

                <div style={{ fontWeight: "bold", marginTop: "15px" }}>Общая стоимость</div>
                <div style={{ fontSize: "18px", marginBottom: "15px" }}>{result.total.toLocaleString()} ₽</div>

                <button className="button" onClick={() => navigate("/manual")}>
                    Рассчитать еще раз
                </button>

                <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "15px" }}>
                    Использованные курсы валют
                    <div>
                        CNYRUB: {cnyRub.toFixed(4)} (курс ЦБ с учётом {percentLabel} ВТБ)
                    </div>
                    <div>EURRUB: {eurRub.toFixed(4)} (ЦБ)</div>
                </div>

                <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "10px" }}>
                    Калькулятор предоставляет примерную конечную стоимость со всеми расходами в городе Уссурийск
                </div>
                <Disclaimer />
            </div>
        </div>
    );
}

export default Result;