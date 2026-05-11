const { Pool } = require("pg");

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/todo_db"
});

async function initDb() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT false
        )    
    `);
}

module.exports = {
    pool,
    initDb
};