// frontend/src/components/Users.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const verifyUser = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/users/${id}/verify`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  return (
    <div>
      <h2>Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Membership ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.membership_id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.is_verified ? "✅" : "❌"}</td>
              <td>
                {!u.is_verified && (
                  <button onClick={() => verifyUser(u.id)}>Verify</button>
                )}
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
