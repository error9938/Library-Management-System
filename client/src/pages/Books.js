import React, { useEffect, useState } from "react";
import API from "../api";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API}/books`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Books fetched =>", data); // 🔥 MUST LOG ARRAY
        setBooks(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    const res = await fetch(`${API}/books/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Failed to remove book");
    }
  };

  return (
    <div className="page">
      <h1>All Books</h1>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Total</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          ) : (
            books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.category}</td>
                <td>{b.total_copies}</td>
                <td>{b.available_copies}</td>
                <td>
                  <button onClick={() => handleDelete(b.id)}>
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
