const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

const authRouts = require('./routes/authRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',authRouts);

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
