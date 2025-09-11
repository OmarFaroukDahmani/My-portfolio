const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
