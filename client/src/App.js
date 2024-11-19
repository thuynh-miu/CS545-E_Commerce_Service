import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SellerPage from "./components/SellerPage";
import RegisterPage from "./components/RegisterPage";


function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </div>
  );
}

export default App;
