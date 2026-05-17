const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  const { search, status, view } = req.query;

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

  if (view === "past") {
    sql += " AND status = 'completed'";
  }

  sql += " ORDER BY due_date ASC, due_time ASC, created_at DESC";

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { title, description, due_date, due_time } = req.body;

  if (!title || !due_date || !due_time) {
    return res.status(400).json({
      message: "Title, date and time are required",
    });
  }

  const sql =
    "INSERT INTO todos (user_id, title, description, due_date, due_time) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [req.user.id, title, description, due_date, due_time],
    (err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.status(201).json({ message: "Todo created successfully" });
    }
  );
});

router.put("/:id", authMiddleware, (req, res) => {
  const { title, description, due_date, due_time, status } = req.body;

  const sql =
    "UPDATE todos SET title = ?, description = ?, due_date = ?, due_time = ?, status = ? WHERE id = ? AND user_id = ?";

  db.query(
    sql,
    [title, description, due_date, due_time, status, req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "Todo updated successfully" });
    }
  );
});

router.delete("/:id", authMiddleware, (req, res) => {
  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Todo deleted successfully" });
  });
});

module.exports = router;