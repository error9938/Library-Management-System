import express from "express";
import { 
  getDashboardStats,
  getUsersList,
  getStudentHistory
} from "../controllers/dashboardController.js";

const router = express.Router();

// MAIN DASHBOARD STATS
router.get("/stats", getDashboardStats);

// ADMIN or STUDENT LIST
router.get("/users/:role", getUsersList);

// STUDENT HISTORY (issued + returned)
router.get("/student/:id", getStudentHistory);
router.get("/all", (req, res) => {
  const sql = "SELECT id, name, email, role, student_id FROM users ORDER BY role";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

export default router;
