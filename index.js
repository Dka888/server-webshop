const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// app.use(cors({ origin:true, credentials: true }));
app.use(cors());


const port = process.env.PORT;
const stripeSekretKey = process.env.STRIPE_SEKRET_KEY;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})