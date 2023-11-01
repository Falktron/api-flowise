require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const pg = require('pg');
const cors = require('cors');
const axios = require('axios');

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:63409', 'http://localhost:5000','https://flow-mium-chat.onrender.com'],
}));

app.use(express.json());

const TIMEOUT_DURATION = 20 * 60 * 1000; // 10 minutes in milliseconds

const pool = new pg.Pool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
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

app.get('/result', async (req, res) => {
  try {
    console.log('Request received for /audience endpoint');
    const result = await pool.query(
      'SELECT results FROM pipeline WHERE project_id = $1 AND pipeline_name = $2',
      [req.query.project_id, req.query.pipeline_name]
    );
    console.log('Query executed successfully');
    console.log('Result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchData(url, data) {
  try {
    const response = await axios.post(url, data, {
      timeout: TIMEOUT_DURATION,
      headers: {
        Authorization: 'Bearer gDqzGFaOSHeOKe4Sc6Js1iZg1RuQERr8po8TgDKMGHE=',
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch data from the API');
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
}

app.post("/target-users-local", async (req, res) => {
  try {
    const result = await fetchData(
      "http://75.119.157.23:3001/api/v1/prediction/42b318aa-e29b-4cf7-9049-6bfa63271a3d",
      req.body
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/target-users", async (req, res) => {
  try {
    const result = await fetchData(
      "http://75.119.157.23:3001/api/v1/prediction/df3a83b7-60da-43d6-ac2f-8939a5e86b72",
      req.body
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/marketing-research", async (req, res) => {
  try {
    const result = await fetchData(
      "http://75.119.157.23:3001/api/v1/prediction/afa6f22a-60f4-4a13-a644-d522ed749562",
      req.body
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/business-model", async (req, res) => {
  try {
    const result = await fetchData(
      "http://75.119.157.23:3001/api/v1/prediction/58f9feec-0b72-4f4a-9d29-bf5671c976a2",
      req.body
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/brand-identity", async (req, res) => {
  try {
    const result = await fetchData(
      "http://75.119.157.23:3001/api/v1/prediction/dca12210-60f5-44b1-af00-4860cb37c8ad",
      req.body
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Remaining routes...

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = TIMEOUT_DURATION;
server.headersTimeout = TIMEOUT_DURATION;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;
