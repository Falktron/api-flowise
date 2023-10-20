const express = require('express');
const router = express.Router();
const { db } = require('./db.cjs');


router.get('/audience', async (req, res) => {
    try {
      console.log('Request received for /result endpoint');
      const result = await db.any(
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


module.exports = router;