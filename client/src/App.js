import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SellerPage from "./components/SellerPage";
import RegisterPage from "./components/RegisterPage";
import Cart from "./components/Cart";
import ProductsSearch from "./components/ProductsSearch";
import ProductDetailPage from "./components/ProductDetailPage";
import AdminDashboard from "./components/AdminDashboard";
import Checkout from "./components/Checkout";
import SellerDashboard from "./components/SellerDashboard";
import SellerOrders from "./components/SellerOrders";
import BuyerDashboard from "./components/BuyerDashboard";
import OrdersHistory from "./components/OrdersHistory";


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
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/search" element={<ProductsSearch />} />
        <Route
          path="/products/detail/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/seller" element={<SellerDashboard />} >
          <Route path="orders" element={<SellerOrders />} />
          <Route path="products" />
        </Route>
        <Route path="/buyer" element={<BuyerDashboard />} >
          <Route path="orders" element={<OrdersHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
