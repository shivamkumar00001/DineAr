import { Routes, Route } from "react-router-dom";

// AUTH
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Forget from "../pages/auth/Forget";
import ResetPassword from "../pages/auth/ResetPassword";

// PROFILE
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

// OWNER + MENU
import Dashboard from "../pages/Dashboard/OwnerDashboard";
import SubscriptionPage from "../pages/subscription/subscriptionPage";
import DishList from "../pages/Menu/DishList";
import AddDishPage from "../pages/Menu/AddDishPage";
import EditDishPage from "../pages/Menu/EditDishPage";
import QrPage from "../pages/Menu/QrPage";
import OrdersPage from "../pages/ordermanage/OrderPage";

// CUSTOMER
import LandingPage from "../pages/Home/LandingPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />

      {/* AUTH */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* PROFILE */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* OWNER */}
      <Route path="/dashboard/:restaurantId" element={<Dashboard />} />
      <Route path="/subscribe/:restaurantId" element={<SubscriptionPage />} />

      {/* MENU */}
      <Route path="/restaurant/:restaurantId/dishes" element={<DishList />} />
      <Route path="/restaurant/:restaurantId/menu/add" element={<AddDishPage />} />
      <Route path="/restaurant/:restaurantId/dish/:id/edit" element={<EditDishPage />} />

      {/* QR */}
      <Route path="/qr/:restaurantId" element={<QrPage />} />

      {/* ORDERS */}
      <Route path="/restaurant/:restaurantId/orders" element={<OrdersPage />} />
    </Routes>
  );
}
