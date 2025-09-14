// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";           // your Home.jsx (page)
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* User */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
