import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import 'dotenv/config';
import Stripe from 'stripe';

const { json } = pkg;
const app = express();
app.use(express.static('public'));
app.use(json());
app.use(cors());



const port = process.env.PORT;
const stripeSekretKey = process.env.STRIPE_SEKRET_KEY;
const stripe = new Stripe(stripeSekretKey);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/checkout', async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map(item => ({
                price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.product]
                }, 
                unit_amount: item.price * 100,
            },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html'

        });

        res.status(200).json(session);
    } catch(e) {
        next(e);
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})