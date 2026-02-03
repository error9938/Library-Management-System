import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUserFriends, FaPlusCircle } from "react-icons/fa";
import {
  MdAssignmentReturn,
  MdLibraryBooks,
  MdOutlineLibraryAdd,
} from "react-icons/md";
import API from "../api";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  fetch(`${API}/dashboard/stats`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      return res.json();
    })
    .then((data) => setStats(data))
    .catch((err) => {
      console.error(err);
      setStats({
        totalBooks: 0,
        issued: 0,
        returned: 0,
        users: 0,
      });
    });
}, []);

  if (!stats) return <h2 style={{ padding: 40 }}>Loading…</h2>;

  return (
    <div className="dash-container">
      <h2 className="dash-title">📊 Admin Dashboard</h2>

      <div className="dash-grid">
        {/* TOTAL BOOKS */}
        <div className="dash-card" onClick={() => navigate("/books")}>
          <FaBook className="dash-icon" />
          <h3>{stats.totalBooks}</h3>
          <p>Total Books</p>
        </div>

        {/* ISSUED BOOKS */}
        <div className="dash-card" onClick={() => navigate("/issued")}>
          <MdLibraryBooks className="dash-icon" />
          <h3>{stats.issued}</h3>
          <p>Books Issued</p>
        </div>

        {/* USERS */}
        <div className="dash-card" onClick={() => navigate("/users")}>
          <FaUserFriends className="dash-icon" />
          <h3>{stats.users}</h3>
          <p>Registered Users</p>
        </div>

        {/* ADD BOOK */}
        <div className="dash-card " onClick={() => navigate("/add-book")}>
          <FaPlusCircle className="dash-icon" />
          <h3>Add Book</h3>
          <p>Add new book</p>
        </div>

        {/* ISSUE BOOK */}
        <div className="dash-card" onClick={() => navigate("/issue")}>
          <MdOutlineLibraryAdd className="dash-icon" />
          <h3>Issue Book</h3>
          <p>Issue to student</p>
        </div>

        {/* RETURN BOOK */}
        <div className="dash-card" onClick={() => navigate("/return")}>
          <MdAssignmentReturn className="dash-icon" />
          <h3>Return Book</h3>
          <p>Collect book</p>
        </div>
      </div>
    </div>
  );
}
