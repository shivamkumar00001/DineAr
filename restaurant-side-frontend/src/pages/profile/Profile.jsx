import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

const Profile = () => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile/me");
        setOwner(data); // safe, after async fetch
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile(); // call async function
  }, []);

  if (!owner) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="flex items-center mb-6">
        {owner.profilePhoto ? (
          <img
            src={`http://localhost:5000${owner.profilePhoto}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
            No Photo
          </div>
        )}
        <h2 className="text-xl font-semibold">{owner.ownerName}</h2>
      </div>

      <div className="space-y-2">
        <p><strong>Restaurant:</strong> {owner.restaurantName}</p>
        <p><strong>Email:</strong> {owner.email}</p>
        <p><strong>Phone:</strong> {owner.phone}</p>
        <p><strong>State:</strong> {owner.state}</p>
        <p><strong>City:</strong> {owner.city}</p>
        <p><strong>Pincode:</strong> {owner.pincode}</p>
        <p><strong>Type:</strong> {owner.type}</p>
        <p><strong>Category:</strong> {owner.category}</p>
        <p><strong>Description:</strong> {owner.restaurantDescription}</p>
      </div>

      <button
        onClick={() => window.location.href = "/edit-profile"}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
