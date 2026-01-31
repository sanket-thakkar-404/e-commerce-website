import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import PersonalDetails from "./pages/PersonalDetails";
import Addresses from "./pages/Addresses";
import Coupons from "./pages/Coupons";
import ProductDetails from "./pages/ProductDetails";
import MenCollection from "./components/MenCollection";
import WomenCollection from "./components/WomenCollection";
import LeatherBagCollection from "./components/LeatherBagCollection";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import TrackOrder from "./pages/TrackOrder";
import WishList from "./pages/WishList";
import Admin from "./pages/Admin";
import CheckOutAddress from "./pages/CheckOutAddress";
import "remixicon/fonts/remixicon.css";

const App = () => {
  return (
    <Routes>
      {/* Main app layout: Navbar + content */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />}>
          <Route path="men" element={<MenCollection />} />
          <Route path="women" element={<WomenCollection />} />
          <Route path="leather-bags" element={<LeatherBagCollection />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout-address" element={<CheckOutAddress/>} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmed" element={<OrderConfirmed />} />
        <Route path="track-order" element={<TrackOrder />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="personal-details" element={<PersonalDetails />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="admin" element={<Admin />} />
      </Route>

      {/* Auth & other pages without main layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
