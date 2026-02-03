import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();  // <-- THIS MUST BE HERE TOO

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("❌ Database Connection Failed", err);
    } else {
        console.log("✅ Connected to MySQL Database");
        connection.release();
    }
});

export default db;
