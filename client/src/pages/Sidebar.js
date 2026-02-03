import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaExchangeAlt,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // logged-in admin details
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* TOP */}
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>

        {!collapsed && (
          <>
            <h3>Library</h3>
          </>
        )}
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="menu-item">
          <FaTachometerAlt />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/books" className="menu-item">
          <FaBook />
          {!collapsed && <span>Books</span>}
        </NavLink>

        <NavLink to="/issue" className="menu-item">
          <FaExchangeAlt />
          {!collapsed && <span>Issue Book</span>}
        </NavLink>

        <NavLink to="/return" className="menu-item">
          <FaExchangeAlt />
          {!collapsed && <span>Return Book</span>}
        </NavLink>

        <NavLink to="/users" className="menu-item">
          <FaUsers />
          {!collapsed && <span>Users</span>}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="admin-info">
            <div className="admin-name">{user?.name || "Admin"}</div>
            <div className="admin-role">Administrator</div>
          </div>
        )}

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
