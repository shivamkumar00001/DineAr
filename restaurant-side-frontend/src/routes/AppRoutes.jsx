import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerDashBoard from "../pages/Dashboard/OwnerDashboard";
import SubscriptionPage from "../pages/subscription/subscriptionPage";


export default function AppRoutes() {
  return <>
       <BrowserRouter>
         <Routes>
          <Route path ="/dashboard" element= {<OwnerDashBoard/>}/>
          <Route path ="/subscribe" element = {<SubscriptionPage/>}/>
         </Routes>
       </BrowserRouter>
   </>
}