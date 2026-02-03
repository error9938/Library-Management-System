import React, { useEffect, useState } from "react";
import API from "../api";

export default function IssuedBooks() {
  const [issued, setIssued] = useState([]);

  useEffect(() => {
    fetch(`${API}/issue`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 ISSUED DATA => ", data);
        setIssued(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <h1>📚 Issued Books</h1>

      {issued.length === 0 ? (
        <p>No issued books found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Book</th>
              <th>Author</th>
              <th>Student</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Fine</th>
            </tr>
          </thead>

          <tbody>
            {issued.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.title}</td>
                <td>{i.author}</td>
                <td>{i.userName}</td>
                <td>{i.issue_date}</td>
                <td>{i.due_date}</td>
                <td>{i.status}</td>
                <td>₹{i.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
