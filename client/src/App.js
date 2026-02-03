import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./pages/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import IssuedBooks from "./pages/IssuedBooks";
import AddBook from "./pages/AddBook";
import UsersList from "./pages/UsersList";

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  // 🔥 THIS IS IMPORTANT
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      {!hideSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* 🔥 MAIN CONTENT AUTO ADJUST */}
      <div
        className="main-content"
        style={{
          marginLeft: hideSidebar
            ? 0
            : collapsed
            ? 70   // sidebar collapsed width
            : 220, // sidebar full width
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/issue" element={<IssueBook />} />
          <Route path="/return" element={<ReturnBook />} />
          <Route path="/issued" element={<IssuedBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
