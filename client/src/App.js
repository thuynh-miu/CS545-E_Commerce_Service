import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SellerPage from "./components/SellerPage";
import RegisterPage from "./components/RegisterPage";
import Cart from "./components/Cart";
import ProductsSearch from "./components/ProductsSearch";


function App() {
  return (
    <div>
      <header className="mb-3">
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/search" element={<ProductsSearch />} />
      </Routes>
    </div>
  );
}

export default App;
