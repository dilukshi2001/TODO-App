const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const sqlFile = path.join(__dirname, "seed.sql");
const sql = fs.readFileSync(sqlFile, "utf8");

connection.query(sql, (err) => {
  if (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }

  console.log("Database seeded successfully");
  connection.end();
});