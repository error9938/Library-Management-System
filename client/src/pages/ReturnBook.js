import React, { useState } from "react";
import API from "../api";

export default function ReturnBook() {
  const [issue_id, setIssue] = useState("");
  const [return_date, setReturnDate] = useState("");

  const handleReturn = async () => {
    if (!issue_id || !return_date) {
      alert("Enter Issue ID & Return date");
      return;
    }

    const res = await fetch(`${API}/issue/return`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue_id, return_date }),
    });

    const data = await res.json();
    alert(`${data.message}\nFine: ₹${data.fine || 0}`);
  };

  return (
    <div className="page">
      <h1>📗 Return Book</h1>

      <input placeholder="Issue ID" onChange={(e) => setIssue(e.target.value)} />
      <input type="date" onChange={(e) => setReturnDate(e.target.value)} />

      <button onClick={handleReturn}>Return Book</button>
    </div>
  );
}
