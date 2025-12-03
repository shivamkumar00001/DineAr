import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerDashBoard from "../pages/Dashboard/OwnerDashboard";
import SubscriptionPage from "../pages/subscription/subscriptionPage";
import DishList from "../pages/Menu/DishList";
import LandingPage from "../pages/Home/LandingPage";
import AddDishPage from "../pages/Menu/AddDishPage";
import EditDishPage from "../pages/Menu/EditDishPage";

import QrPage from "../pages/Menu/QrPage";
import OrdersPage from "../pages/ordermanage/OrderPage";
import Dashboard from "../pages/Dashboard/OwnerDashboard";


export default function AppRoutes() {
  return <>
       <BrowserRouter>
          <Routes>
          <Route path ="/" element= {<LandingPage/>}/>
          <Route path ="/subscribe/:restaurantId" element = {<SubscriptionPage/>}/>
          <Route path="/restaurant/:restaurantId/dishes" element={<DishList />} />
          <Route path="/restaurant/:restaurantId/menu/add" element={<AddDishPage />} />
          <Route path="/restaurants/:restaurantId/dish/:id/edit" element={<EditDishPage/>}/>
          <Route path="/qr/:restaurantId" element={<QrPage />} />
          <Route path="/dashboard/:restaurantId" element={<Dashboard/>}/>
           {/* NEW ORDER MANAGEMENT ROUTE */}
          <Route path="/restaurant/:restaurantId/orders" element={<OrdersPage/>} />
         </Routes>
       </BrowserRouter>
   </>
}