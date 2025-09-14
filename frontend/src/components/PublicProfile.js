// frontend/src/components/PublicProfile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Public profile error:", err);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <h2>{user.name}</h2>
      {user.profile_photo && (
        <img src={`http://localhost:5000/${user.profile_photo}`} alt="Profile" width="150" />
      )}
      <p>📍 {user.address}</p>
      <p>🎂 {user.date_of_birth}</p>
      <p>⚧ {user.gender}</p>

      <h3>Work Experience</h3>
      {(user.work_experience || []).map((exp, idx) => (
        <div key={idx}>
          <strong>{exp.company}</strong> - {exp.designation}
          <p>{exp.duration}</p>
          <p>{exp.responsibilities}</p>
        </div>
      ))}

      <h3>Education</h3>
      {(user.education || []).map((edu, idx) => (
        <div key={idx}>
          <strong>{edu.institution}</strong> - {edu.degree}
          <p>{edu.year}</p>
        </div>
      ))}
    </div>
  );
};

export default PublicProfile;
