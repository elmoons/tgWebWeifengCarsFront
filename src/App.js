import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import China from "./pages/China";
import Manual from "./pages/Manual";
import Result from "./pages/Result";

function App() {

    useEffect(() => {

        const tg = window.Telegram.WebApp;

        tg.ready();
        tg.expand();

    }, []);

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/china" element={<China />} />
                <Route path="/manual" element={<Manual />} />
                <Route path="/result" element={<Result />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;