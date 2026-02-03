import express from "express";
import {
  getAllUsers,
  getAdmins,
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
} from "../controllers/userController.js";

const router = express.Router();

// All users
router.get("/", getAllUsers);

// Only admins
router.get("/admins", getAdmins);

// Only students
router.get("/students", getStudents);

// Single student details
router.get("/student/:id", getStudentById);

// ➕ Add student
router.post("/student", addStudent);

// ❌ Delete student
router.delete("/student/:id", deleteStudent);

export default router;
