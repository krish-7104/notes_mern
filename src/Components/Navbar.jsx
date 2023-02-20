import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const router = useLocation();
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <p
        className="font-semibold text-2xl tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        NotesAtEase
      </p>
      <div>
        {router.pathname !== "/login" && (
          <button
            className="bg-blue-900 text-white py-1 px-4 rounded-sm mr-3"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        {router.pathname !== "/register" && (
          <button
            className="bg-blue-900 text-white py-1 px-4 rounded-sm"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
