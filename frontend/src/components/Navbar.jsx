import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem", marginRight: "1rem" }}>Karma Follows</Link>
      <Link to="/">Home</Link> |{" "}
      {user ? (
        <>
          {user.role === "serviceProvider" && (
            <>
              <Link to="/dashboard">Dashboard</Link> |{" "}
            </>
          )}
          <Link to="/bookings">My Bookings</Link> |{" "}
          <span>Welcome, {user.mobile}</span> |{" "}
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
