import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/user-login");

        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/user-login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/profile/update",
        {
          name: user.name,
          date_of_birth: user.date_of_birth,
          gender: user.gender,
          phone: user.phone,
          address: user.address,
          work_experience: user.work_experience || [],
          education: user.education || [],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Profile updated");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  const handlePhotoUpload = async () => {
    if (!photo) return;
    const formData = new FormData();
    formData.append("photo", photo);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/profile/upload-photo",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser({ ...user, profile_photo: res.data.photoUrl });
  };

  const handleResumeUpload = async () => {
    if (!resume) return;
    const formData = new FormData();
    formData.append("resume", resume);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/profile/upload-resume",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser({ ...user, resume: res.data.resumeUrl });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Edit Profile</h2>

      {/* Personal Info */}
      <div>
        <input
          type="text"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="date"
          value={user.date_of_birth || ""}
          onChange={(e) =>
            setUser({ ...user, date_of_birth: e.target.value })
          }
        />
        <input
          type="text"
          value={user.gender || ""}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          placeholder="Gender"
        />
        <input
          type="text"
          value={user.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="text"
          value={user.address || ""}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          placeholder="Address"
        />
        <button onClick={handleUpdate}>Save Changes</button>
      </div>

      {/* Photo Upload */}
      <div>
        <h3>Profile Photo</h3>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button onClick={handlePhotoUpload}>Upload Photo</button>
      </div>

      {/* Resume Upload */}
      <div>
        <h3>Resume</h3>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        <button onClick={handleResumeUpload}>Upload Resume</button>
      </div>

      {/* Work Experience */}
      <div>
        <h3>Work Experience</h3>
        {(user.work_experience || []).map((exp, idx) => (
          <div key={idx}>
            <input
              type="text"
              placeholder="Company"
              value={exp.company || ""}
              onChange={(e) => {
                const newExp = [...user.work_experience];
                newExp[idx].company = e.target.value;
                setUser({ ...user, work_experience: newExp });
              }}
            />
            <input
              type="text"
              placeholder="Designation"
              value={exp.designation || ""}
              onChange={(e) => {
                const newExp = [...user.work_experience];
                newExp[idx].designation = e.target.value;
                setUser({ ...user, work_experience: newExp });
              }}
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration || ""}
              onChange={(e) => {
                const newExp = [...user.work_experience];
                newExp[idx].duration = e.target.value;
                setUser({ ...user, work_experience: newExp });
              }}
            />
            <textarea
              placeholder="Responsibilities"
              value={exp.responsibilities || ""}
              onChange={(e) => {
                const newExp = [...user.work_experience];
                newExp[idx].responsibilities = e.target.value;
                setUser({ ...user, work_experience: newExp });
              }}
            />
          </div>
        ))}
        <button
          onClick={() =>
            setUser({
              ...user,
              work_experience: [
                ...(user.work_experience || []),
                {
                  company: "",
                  designation: "",
                  duration: "",
                  responsibilities: "",
                },
              ],
            })
          }
        >
          + Add Experience
        </button>
      </div>

      {/* Education */}
      <div>
        <h3>Education</h3>
        {(user.education || []).map((edu, idx) => (
          <div key={idx}>
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution || ""}
              onChange={(e) => {
                const newEdu = [...user.education];
                newEdu[idx].institution = e.target.value;
                setUser({ ...user, education: newEdu });
              }}
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree || ""}
              onChange={(e) => {
                const newEdu = [...user.education];
                newEdu[idx].degree = e.target.value;
                setUser({ ...user, education: newEdu });
              }}
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year || ""}
              onChange={(e) => {
                const newEdu = [...user.education];
                newEdu[idx].year = e.target.value;
                setUser({ ...user, education: newEdu });
              }}
            />
          </div>
        ))}
        <button
          onClick={() =>
            setUser({
              ...user,
              education: [
                ...(user.education || []),
                { institution: "", degree: "", year: "" },
              ],
            })
          }
        >
          + Add Education
        </button>
      </div>
    </div>
  );
};

export default Profile;
