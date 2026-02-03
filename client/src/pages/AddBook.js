import React, { useState } from "react";
import API from "../api";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const addBook = async () => {
    try {
      const res = await fetch(`${API}/books/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          category,
          total_quantity: quantity,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

      setTitle("");
      setAuthor("");
      setCategory("");
      setQuantity("");
    } catch {
      setMessage("❌ Error adding book");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Add New Book 📚</h1>

      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      /><br /><br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      /><br /><br />

      <input
        placeholder="Total Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      /><br /><br />

      <button style={{ padding: "10px 25px" }} onClick={addBook}>
        Add Book
      </button>

      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
    </div>
  );
}
