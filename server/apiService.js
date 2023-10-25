import express from 'express';
import pg from 'pg';
import fetch from "node-fetch";

const app = express();

const pool = new pg.Pool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/test', async (req, res) => {
  try {
    console.log('Request received for /test endpoint');
    const result = await pool.query('SELECT results FROM pipeline');
    console.log('Query executed successfully');
    console.log('Result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/audience', async (req, res) => {
  try {
    console.log('Request received for /audience endpoint');
    const result = await pool.query(
      'SELECT results FROM pipeline WHERE project_id = $1 AND pipeline_name = $2',
      [req.query.projectId, req.query.pipelineName]
    );
    console.log('Query executed successfully');
    console.log('Result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/target-users", async (req, res) => {
  try {
    const data = req.body;
    const response = await fetch("http://75.119.157.23:3001/api/v1/prediction/df3a83b7-60da-43d6-ac2f-8939a5e86b72", {
      headers: {
        Authorization: "Bearer gDqzGFaOSHeOKe4Sc6Js1iZg1RuQERr8po8TgDKMGHE=",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/business-model", async (req, res) => {
  try {
    const data = req.body;
    const response = await fetch("http://75.119.157.23:3001/api/v1/prediction/58f9feec-0b72-4f4a-9d29-bf5671c976a2", {
      headers: {
        Authorization: "Bearer gDqzGFaOSHeOKe4Sc6Js1iZg1RuQERr8po8TgDKMGHE=",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/marketing-research", async (req, res) => {
  try {
    const data = req.body;
    const response = await fetch("http://75.119.157.23:3001/api/v1/prediction/afa6f22a-60f4-4a13-a644-d522ed749562", {
      headers: {
        Authorization: "Bearer gDqzGFaOSHeOKe4Sc6Js1iZg1RuQERr8po8TgDKMGHE=",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.DATABASE_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
