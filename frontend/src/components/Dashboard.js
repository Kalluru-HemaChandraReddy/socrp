// frontend/src/components/Dashboard.js
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Users from "./Users";
import Events from "./Events";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#f0f0f0", height: "100vh", padding: "20px" }}>
        <h3>Admin Panel</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="users">Users</Link></li>
            <li><Link to="events">Events</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<h2>Welcome to Admin Dashboard</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
