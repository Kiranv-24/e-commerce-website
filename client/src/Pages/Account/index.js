import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css-files/Account.css";
import { fetchDataFromApi } from "../../api";

const username = localStorage.getItem("username");

const Account = () => {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState("Fetching address...");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromApi(`/api/user/${username}`)
      .then((response) => {
        setUser(response.user);
        setPhone(response.user.phone || "");
      })
      .catch((error) => console.error("Error fetching user data:", error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setAddress("Location access denied.");
        }
      );
    } else {
      setAddress("Geolocation not supported by your browser.");
    }
  }, []);
  const goBack = () => {
    navigate("/");
  };
  const fetchAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const locationAddress =
        response.data.display_name || "Address not available";
      setAddress(locationAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
        <div className="profile-info">
          <p className="text-lg mb-2">
            <span className="font-semibold">Name:</span> {user.name || "N/A"}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Email:</span> {user.email || "N/A"}
          </p>
          <div className="text-lg mb-2">
            <label className="font-semibold">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="text-lg mb-2">
            <label className="font-semibold">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-profile-button">
          <button>Save Changes</button>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

export default Account;
