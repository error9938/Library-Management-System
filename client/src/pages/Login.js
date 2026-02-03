import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }
 localStorage.setItem("user", JSON.stringify(data.user));
    alert("Successfully Logged In!");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Server not reachable");
  }
};

 return (
  <div className="login-page">   {/* 🔥 NEW WRAPPER */}

    <div className="auth-wrapper">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h1 className="brand">
            <span className="brand-main">Library</span>
            <span className="brand-accent">Management</span>
          </h1>

          <h2 className="auth-title">Log In</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="show-btn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="primary-btn" onClick={handleLogin}>
            Log In
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="auth-right">
          <img
            src="/login-books.jpeg"
            alt="books"
            className="auth-illustration"
          />
        </div>

      </div>
    </div>

  </div>
);
}
