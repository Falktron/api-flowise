const express = require('express');
const app = express();

app.use(express.json());

// TODO: Add API routes here

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});