import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "../pages/LayoutAdmin/LayoutAdmin";
// import StartGame from "../pages/StartGame/StartGame";
import { KahootProvider } from "../context";
import LayoutClient from "../pages/LayoutClient/LayoutClient";
import CreateTest from "../pages/CreateTest/CreateTest";
import StartGame from "../pages/StartGame/StartGame";

const RoutesKahoot = () => {
    return (
        <KahootProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutAdmin />} />
                    <Route path="/create" element={<CreateTest />} />
                    <Route path="/game/:codigo" element={<LayoutClient />} />
                    <Route path="/game/:codigo/start" element={<StartGame />} />
                </Routes>
            </BrowserRouter>
        </KahootProvider>
    );
}

export default RoutesKahoot;