import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerDashBoard from "../pages/Dashboard/OwnerDashboard";
import SubscriptionPage from "../pages/subscription/subscriptionPage";
import DishList from "../pages/Menu/DishList";
import LandingPage from "../pages/Home/LandingPage";


export default function AppRoutes() {
  return <>
       <BrowserRouter>
         <Routes>
          <Route path ="/" element= {<LandingPage/>}/>
          <Route path ="/subscribe" element = {<SubscriptionPage/>}/>
          <Route path="dishes" element={<DishList/>}/>
         </Routes>
       </BrowserRouter>
   </>
}