import React, { useState } from "react";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useLocation, Link } from "react-router-dom";
import { useAuthHeader, useIsAuthenticated, useSignOut } from "react-auth-kit";
import axios from "axios";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const TopBar = ({ admin }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  let location = useLocation();
  const authHeader = useAuthHeader();

  const isAuthenticated = useIsAuthenticated();

  const signOut = useSignOut();

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${api}/logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        }
      );

      setLoading(false);
      setSuccessMessage(response.data.message);

      setInterval(() => {
        setSuccessMessage(null);
        signOut();
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);

      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <div className="h-20 w-full flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="font-ubuntu font-bold text-2xl md:text-3xl lg:text-4xl">
        Story{" "}
        {!admin
          ? location.pathname.includes("writer")
            ? "Teller"
            : "Seeker"
          : "Admin"}
      </div>
      {isAuthenticated() ? (
        <ul className="flex items-center gap-3">
          <button disabled={loading} className="btn" onClick={handleLogOut}>
            <UilSignOutAlt className="h-5 w-5" /> Logout
          </button>
        </ul>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-100 text-black px-6 py-2 rounded-full hover:bg-indigo-300"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
