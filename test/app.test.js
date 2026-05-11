const request = require("supertest");
const app = require("../src/app");
const { initDb, pool } = require("../src/db");

beforeAll(async () => {
    await initDb();
    await pool.query("DELETE FROM todos");
});

afterAll(async () => {
    await pool.end();
});

test("GET /health should return ok", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
});

test("POST /todos should create todo", async () => {
    const response = await request(app)
        .post("/todos")
        .send({ title: "learn ci cd"});

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("learn ci cd");
    expect(response.body.done).toBe(false);
});

test("GET /todos should return todos", async () => {
    await request(app)
        .post("/todos")
        .send({ title: "todo for get test" });

    const response = await request(app).get("/todos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
});