import express from "express";
import { addBook, getBooks,deleteBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/add", addBook);
router.delete("/:id", deleteBook);


export default router;
