// frontend/src/components/Events.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/events",
      { title, description, date, location },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    fetchEvents();
  };

  return (
    <div>
      <h2>Events</h2>

      <form onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />{" "}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />{" "}
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />{" "}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />{" "}
        <button type="submit">Add Event</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{new Date(ev.date).toLocaleString()}</td>
              <td>{ev.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
