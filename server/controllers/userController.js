import db from "../config/db.js";
import bcrypt from "bcryptjs";

// All users
export const getAllUsers = (req, res) => {
  const sql = "SELECT id, student_id, name, email, role FROM users ORDER BY id ASC";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Only admins
export const getAdmins = (req, res) => {
  const sql = "SELECT id, name, email FROM users WHERE role = 'admin'";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Only students
export const getStudents = (req, res) => {
  const sql = `
    SELECT id, student_id, name, email
    FROM users
    WHERE role = 'student'
    ORDER BY id ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Single student
export const getStudentById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, student_id, name, email
    FROM users
    WHERE id = ? AND role = 'student'
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json(err);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(rows[0]);
  });
};

// Add student
// Add student (FIXED)
export const addStudent = (req, res) => {
  const { student_id, name, email } = req.body;

  if (!student_id || !name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // 🔐 default password = student_id
  const hashedPassword = bcrypt.hashSync(student_id, 10);

  const sql = `
    INSERT INTO users (student_id, name, email, password, role)
    VALUES (?, ?, ?, ?, 'student')
  `;

  db.query(
    sql,
    [student_id, name, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add student" });
      }

      res.json({ message: "Student added successfully" });
    }
  );
};
// Delete student
export const deleteStudent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ? AND role = 'student'";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  });
};
