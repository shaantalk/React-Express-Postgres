const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const pool = new Pool({
  // user: process.env.POSTGRES_USER || "user",
  // host: process.env.POSTGRES_HOST || "postgres",
  // database: process.env.POSTGRES_DB || "mydb",
  // password: process.env.POSTGRES_PASSWORD || "password",
  // port: process.env.POSTGRES_PORT || 5432,
  connectionString: process.env.DATABASE_URL,
});

app.use(bodyParser.json());

(async () => {
  const pool = new Pool({
    // ... your connection details
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS names ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL );"
    ); // Creates table if it doesn't exist with auto-incrementing ID

    const initialNames = ["Anil", "Santanu", "Kumar", "Srini"];
    const insertQueries = initialNames.map(
      (name) => `INSERT INTO names (name) VALUES ('${name}')`
    );

    await Promise.all(insertQueries.map((query) => pool.query(query)));
    console.log("Initial seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await pool.end(); // Close the connection pool
  }
})();

app.get("/api/names", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM names");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/names", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO names (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
