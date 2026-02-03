import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login success",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  });
};
