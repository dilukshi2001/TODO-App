const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  const { search, status } = req.query;

  let sql = "SELECT * FROM todos WHERE user_id = ?";
  let values = [req.user.id];

  if (search) {
    sql += " AND title LIKE ?";
    values.push(`%${search}%`);
  }

  if (status && status !== "all") {
    sql += " AND status = ?";
    values.push(status);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Todo title is required" });
  }

  const sql = "INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)";

  db.query(sql, [req.user.id, title, description], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.status(201).json({ message: "Todo created successfully" });
  });
});

router.put("/:id", authMiddleware, (req, res) => {
  const { title, description, status } = req.body;

  const sql =
    "UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";

  db.query(sql, [title, description, status, req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Todo updated successfully" });
  });
});

router.delete("/:id", authMiddleware, (req, res) => {
  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Todo deleted successfully" });
  });
});

module.exports = router;