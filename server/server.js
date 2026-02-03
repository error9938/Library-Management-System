import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import booksRoutes from "./routes/booksRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
