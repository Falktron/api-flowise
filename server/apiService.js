require('dotenv').config(); // Add this line at the top of your file
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
    console.error('Error:', error);
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
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const fetchPrediction = async (url, data) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer gDqzGFaOSHeOKe4Sc6Js1iZg1RuQERr8po8TgDKMGHE=",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error fetching data from the API");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal server error");
  }
};

app.post('/target-users', async (req, res) => {
  console.log("gola");
  try {
    
    const result = await fetchPrediction("http://75.119.157.23:3001/api/v1/prediction/df3a83b7-60da-43d6-ac2f-8939a5e86b72", req.body);
    console.log(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/business-model', async (req, res) => {
  try {
    const result = await fetchPrediction("http://75.119.157.23:3001/api/v1/prediction/58f9feec-0b72-4f4a-9d29-bf5671c976a2", req.body);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/marketing-research', async (req, res) => {
  try {
    const result = await fetchPrediction("http://75.119.157.23:3001/api/v1/prediction/afa6f22a-60f4-4a13-a644-d522ed749562", req.body);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.DATABASE_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
