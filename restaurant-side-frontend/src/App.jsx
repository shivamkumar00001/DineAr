import React from "react";
import AuthRoutes from "./routes/AuthRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AuthRoutes />
      <ProfileRoutes />
      <AppRoutes/>
    </>
  );
}


export default App;
