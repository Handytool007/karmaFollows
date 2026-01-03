import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    role: "serviceSeeker",
  });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(formData);
      loginUser(data);
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile"
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="serviceSeeker">Service Seeker</option>
          <option value="serviceProvider">Service Provider</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
