import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Disclaimer from "../components/Disclaimer";

function China() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Header title="Китай" />
            <div style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: "bold" }}>Выберите способ расчета стоимости автомобиля из Китая</div>
            </div>

            <div className="card">
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Ручной расчет</div>
                <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "15px" }}>
                    Введите цену, год производства и объем двигателя для точного расчета
                </div>

                <button className="button" onClick={() => navigate("/manual")}>
                    Перейти к расчету
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

            <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "15px" }}>
                Калькулятор предоставляет примерную конечную стоимость со всеми расходами в городе Уссурийск.
            </div>
        </div>
    );
}

export default China;