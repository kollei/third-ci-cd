const express = require("express");
const { pool } = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Third CI/CD project"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/todos", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
});

app.post("/todos", async (req, res) => {
    const { title } = req.body;

    if (!title){
        return res.status(400).json({
            error: "title is required"
        });
    }

    const result = await pool.query(
        "INSERT INTO todos (title) VALUES ($1) RETURNING *",
        [title]
    );

    res.status(201).json(result.rows[0]);
});

module.exports = app;