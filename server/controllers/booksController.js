import db from "../config/db.js";

/* ➤ ADD NEW BOOK */
export const addBook = (req, res) => {
  const { title, author, category, total_quantity } = req.body;

  if (!title || !author || !total_quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `
    INSERT INTO books (title, author, category, total_copies, available_copies)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, author, category, total_quantity, total_quantity],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Book added successfully",
        book_id: result.insertId,
      });
    }
  );
};

/* ➤ GET ALL BOOKS */
export const getBooks = (req, res) => {
  const sql = "SELECT * FROM books ORDER BY id ASC";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    // 🔥 THIS IS THE FIX
    res.status(200).json(rows);
  });
};


/* ➤ DELETE BOOK (MYSQL FIX ✅) */
export const deleteBook = (req, res) => {
  const { id } = req.params;
console.log("DELETE BOOK ID =>", id);
  const sql = "DELETE FROM books WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  });
};
