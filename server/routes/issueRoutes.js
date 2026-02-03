import express from "express";
import {
  issueBook,
  returnBook,
  getIssuedBooks,
} from "../controllers/issueController.js";

const router = express.Router();

// Correct Routes
router.post("/issue", issueBook);         // POST /api/issue
router.post("/return", returnBook);  // POST /api/issue/return
router.get("/", getIssuedBooks);     // GET  /api/issue

export default router;
