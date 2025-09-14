// frontend/src/components/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: 40 }}>
      <h1>Welcome to SOCRP</h1>
      <p style={{ maxWidth: 600, textAlign: "center" }}>
        Choose your portal below — admin or user. If you're an employer, use the public share links.
      </p>

      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        <Link to="/user-login"><button>🔑 User Login</button></Link>
        <Link to="/user-register"><button>📝 Register</button></Link>
        <Link to="/admin-login"><button>👑 Admin Login</button></Link>
      </div>
    </div>
  );
}
