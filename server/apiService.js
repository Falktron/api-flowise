import express from 'express';
import pg from 'pg';


const app = express();


const pool = new pg.Pool({
  user: process.env.DATABASE_USERNAME ,
  password: process.env.DATABASE_PASSWORD ,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

app.get('/test', async (req, res) => {
  try {
    console.log('Request received for /result endpoint');
    const result = await pool.query(
      'SELECT results FROM pipeline',
    );
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
    console.log('Request received for /result endpoint');
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

const PORT = process.env.DATABASE_PORT|| 5433;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
