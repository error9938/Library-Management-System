import db from "../config/db.js";

// 📌 ISSUE BOOK
export const issueBook = (req, res) => {
  const { book_id, user_id, issue_date, due_date } = req.body;

  console.log("📥 ISSUE API HIT => ", req.body);

  if (!book_id || !user_id || !issue_date || !due_date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 1️⃣ Check availability
  const checkBook = `
    SELECT available_copies 
    FROM books 
    WHERE id = ?
  `;

  db.query(checkBook, [book_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    if (rows.length === 0)
      return res.status(404).json({ message: "Book not found" });

    if (rows[0].available_copies <= 0)
      return res.status(400).json({ message: "No copies available" });

    // 2️⃣ Insert issue record
    const insertIssue = `
      INSERT INTO issued_books 
      (book_id, user_id, issue_date, due_date, status)
      VALUES (?, ?, ?, ?, 'issued')
    `;

    db.query(
      insertIssue,
      [book_id, user_id, issue_date, due_date],
      (err2, result) => {
        if (err2) return res.status(500).json({ error: err2 });

        // 3️⃣ Decrease available copies (SAFE)
        const updateBook = `
          UPDATE books
          SET available_copies = available_copies - 1
          WHERE id = ? AND available_copies > 0
        `;

        db.query(updateBook, [book_id]);

        res.json({
          message: "Book issued successfully",
          issue_id: result.insertId,
        });
      }
    );
  });
};

// 📌 RETURN BOOK
export const returnBook = (req, res) => {
  const { issue_id, return_date } = req.body;

  if (!issue_id || !return_date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 1️⃣ Allow return ONLY if status = issued
  const findIssue = `
    SELECT * 
    FROM issued_books 
    WHERE id = ? AND status = 'issued'
  `;

  db.query(findIssue, [issue_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    if (rows.length === 0)
      return res
        .status(400)
        .json({ message: "Book already returned or invalid issue ID" });

    const issue = rows[0];
    const bookId = issue.book_id;

    // 2️⃣ Fine calculation
    let fine = 0;
    const due = new Date(issue.due_date);
    const ret = new Date(return_date);

    if (ret > due) {
      const daysLate = Math.ceil((ret - due) / (1000 * 60 * 60 * 24));
      fine = daysLate * 5; // ₹5 per day
    }

    // 3️⃣ Update issue record
    const updateIssue = `
      UPDATE issued_books
      SET return_date = ?, fine = ?, status = 'returned'
      WHERE id = ?
    `;

    db.query(updateIssue, [return_date, fine, issue_id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });

      // 4️⃣ Increase available copies (SAFE)
      const updateBook = `
        UPDATE books
        SET available_copies = LEAST(available_copies + 1, total_copies)
        WHERE id = ?
      `;

      db.query(updateBook, [bookId]);

      res.json({
        message: "Book returned successfully",
        fine,
      });
    });
  });
};

// 📌 GET ALL ISSUED + RETURNED BOOKS
export const getIssuedBooks = (req, res) => {
  const sql = `
    SELECT 
      ib.id,
      b.title,
      b.author,
      u.name AS userName,
      ib.issue_date,
      ib.due_date,
      ib.return_date,
      ib.fine,
      ib.status
    FROM issued_books ib
    JOIN books b ON ib.book_id = b.id
    JOIN users u ON ib.user_id = u.id
    ORDER BY ib.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};
