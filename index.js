import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import 'dotenv/config';

const { json } = pkg;
const app = express();
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());
app.use(cors({ origin:true, credentials: true }));



const port = process.env.PORT;
// const stripeSekretKey = process.env.STRIPE_SEKRET_KEY;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})