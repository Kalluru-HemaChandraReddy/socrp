// frontend/src/components/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/user-login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Home profile fetch error:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/user-login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div style={{ padding: 40 }}>Loading profile...</div>;

  const handleShare = () => {
    // share the public API endpoint (you can also create a front-end public page)
    const shareUrl = `http://localhost:5000/api/profile/share/${user.id}`;
    try {
      navigator.clipboard.writeText(shareUrl);
      alert("✅ Profile share link copied:\n" + shareUrl);
    } catch {
      // fallback
      window.prompt("Copy this link:", shareUrl);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            {user.profile_photo ? (
              <img
                src={`http://localhost:5000${user.profile_photo}`}
                alt="profile"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Photo
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p>
              <strong>Membership ID:</strong> {user.membership_id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender || "Not provided"}
            </p>
            <p>
              <strong>DOB:</strong> {user.date_of_birth || "Not provided"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "Not provided"}
            </p>

            {user.resume ? (
              <a
                style={{ display: "inline-block", marginTop: 8 }}
                href={`http://localhost:5000${user.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                📄 Download resume
              </a>
            ) : (
              <div style={{ color: "#666", marginTop: 8 }}>No resume uploaded</div>
            )}
          </div>
        </div>

        {/* Work Experience */}
        <div style={{ marginTop: 20 }}>
          <h3>Work Experience</h3>
          {(user.work_experience || []).length > 0 ? (
            user.work_experience.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 12,
                  padding: 8,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Designation:</strong> {exp.designation}
                </p>
                <p>
                  <strong>Duration:</strong> {exp.duration}
                </p>
                <p>
                  <strong>Responsibilities:</strong> {exp.responsibilities}
                </p>
              </div>
            ))
          ) : (
            <p>No work experience added</p>
          )}
        </div>

        {/* Education */}
        <div style={{ marginTop: 20 }}>
          <h3>Education</h3>
          {(user.education || []).length > 0 ? (
            user.education.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 12,
                  padding: 8,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                <p>
                  <strong>Institution:</strong> {edu.institution}
                </p>
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Year:</strong> {edu.year}
                </p>
              </div>
            ))
          ) : (
            <p>No education added</p>
          )}
        </div>

        <div style={{ marginTop: 18 }}>
          <button onClick={() => navigate("/profile")} style={{ marginRight: 10 }}>
            Edit Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/user-login");
            }}
            style={{ background: "#e44", color: "#fff", marginRight: 10 }}
          >
            Logout
          </button>
          <button onClick={handleShare} style={{ background: "#28a745", color: "#fff" }}>
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}
