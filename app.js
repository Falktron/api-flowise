require('dotenv').config(); // Add this line at the top of your file
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const pg = require('pg');



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

app.post('/testa', async (req, res) => {
  try {
    const result = await fetchPrediction("http://75.119.157.23:3001/api/v1/prediction/7ee09abe-e4b6-436a-9523-a87808404c57", req.body);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => res.type('html').send(html));


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

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
`
