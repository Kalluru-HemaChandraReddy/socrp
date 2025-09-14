// frontend/src/components/UserLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      // Save token and user object
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Login success:", res.data);
      navigate("/home");
    } catch (err) {
      console.error("Login error (frontend):", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>User Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
