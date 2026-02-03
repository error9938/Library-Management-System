import React, { useEffect, useState } from "react";
import API from "../api";

export default function IssueBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const [book_id, setBook] = useState("");
  const [user_id, setUser] = useState("");
  const [issue_date, setIssueDate] = useState("");
  const [due_date, setDueDate] = useState("");

  useEffect(() => {
    // 🔹 Load all books (FIXED)
    fetch(`${API}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));

    // 🔹 Load all students (FIXED)
    fetch(`${API}/users/students`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
    // Set default issue date
    const today = new Date().toISOString().split("T")[0];
    setIssueDate(today);
  }, []);

  const handleIssue = async () => {
    if (!book_id || !user_id || !issue_date || !due_date) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(`${API}/issue/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_id,
        user_id,
        issue_date,
        due_date,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="page">
      <h1>📘 Issue Book</h1>

      {/* BOOK SELECT */}
      <select value={book_id} onChange={(e) => setBook(e.target.value)}>
        <option value="">-- Select Book --</option>
        {books.map((b) => (
          <option key={b.id} value={b.id}>
            {b.title} ({b.available_copies} available)
          </option>
        ))}
      </select>

      {/* STUDENT SELECT */}
      <select value={user_id} onChange={(e) => setUser(e.target.value)}>
        <option value="">-- Select Student --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <label>Issue Date</label>
      <input
        type="date"
        value={issue_date}
        onChange={(e) => setIssueDate(e.target.value)}
      />

      <label>Due Date</label>
      <input
        type="date"
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={handleIssue}>Issue Book</button>
    </div>
  );
}
