import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
};

export default ProfileRoutes;
