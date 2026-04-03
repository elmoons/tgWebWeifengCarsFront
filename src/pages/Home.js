import { useNavigate } from "react-router-dom";
import Disclaimer from "../components/Disclaimer";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="container">

            <div className="title">
                Калькулятор стоимости автомобиля
            </div>

            <div style={{marginBottom:"20px", opacity:0.8}}>
                <div style={{fontWeight:"bold"}}>
                    ВЫБЕРИТЕ СТРАНУ
                </div>

                <div style={{fontSize:"14px", marginTop:"5px"}}>
                    Получите подробный расчёт на автомобиль
                </div>
            </div>

            <div className="card">

                <button
                    className="button"
                    onClick={() => navigate("/china")}
                >
                    Китай
                </button>
                <Disclaimer />
            </div>

        </div>

    );

}

export default Home;