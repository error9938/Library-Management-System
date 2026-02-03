import db from "../config/db.js";

/**
 * 📊 DASHBOARD STATS
 * - Total Books
 * - Issued Books
 * - Returned Books
 * - Students Count (ONLY role='student')
 */
export const getDashboardStats = (req, res) => {
  const stats = {};

  // 1️⃣ TOTAL BOOKS
  db.query("SELECT COUNT(*) AS totalBooks FROM books", (err, r1) => {
    if (err) return res.status(500).json(err);
    stats.totalBooks = r1[0].totalBooks;

    // 2️⃣ ISSUED BOOKS
    db.query(
      "SELECT COUNT(*) AS issued FROM issued_books WHERE status = 'issued'",
      (err2, r2) => {
        if (err2) return res.status(500).json(err2);
        stats.issued = r2[0].issued;

        // 3️⃣ RETURNED BOOKS
        db.query(
          "SELECT COUNT(*) AS returned FROM issued_books WHERE status = 'returned'",
          (err3, r3) => {
            if (err3) return res.status(500).json(err3);
            stats.returned = r3[0].returned;

            // 4️⃣ STUDENTS COUNT (SYNC WITH STUDENT LIST ✅)
            db.query(
              "SELECT COUNT(*) AS users FROM users WHERE role = 'student'",
              (err4, r4) => {
                if (err4) return res.status(500).json(err4);
                stats.users = r4[0].users;

                // ✅ FINAL RESPONSE
                res.json(stats);
              }
            );
          }
        );
      }
    );
  });
};

/**
 * 👥 USER LIST BY ROLE (admin / student)
 */
export const getUsersList = (req, res) => {
  const role = req.params.role; // admin | student

  const sql = `
    SELECT id, student_id, name, email, role
    FROM users
    WHERE role = ?
    ORDER BY id ASC
  `;

  db.query(sql, [role], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

/**
 * 📚 STUDENT HISTORY (Issued + Returned)
 */
export const getStudentHistory = (req, res) => {
  const studentId = req.params.id;

  const sql = `
    SELECT 
      ib.id,
      b.title,
      b.author,
      ib.issue_date,
      ib.due_date,
      ib.return_date,
      ib.status,
      ib.fine
    FROM issued_books ib
    JOIN books b ON ib.book_id = b.id
    WHERE ib.user_id = ?
    ORDER BY ib.id DESC
  `;

  db.query(sql, [studentId], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};
