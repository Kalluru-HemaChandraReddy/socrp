// frontend/src/components/UserRegister.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/user-login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />{" "}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />{" "}
        <input
          name="phone"
          type="text"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
        />{" "}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />{" "}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
