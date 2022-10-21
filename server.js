import express from 'express';
import Stripe from 'stripe';

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51LrzyaKvbb1tU2iANKlMga7UteXAflZvCYvGMV48oyhNF43iLRn9VbMNC6o5yrYUiDDUrQKmVqx5X7w5ncU4higv00Fdl6DHv6";
const SECRET_KEY = "sk_test_51LrzyaKvbb1tU2iAMXTkdScxAiYDwvnCqgfaqHYLKHLtqrsZN18O3SpfMQI7n56l75uZKapsaTmr0Ez2ptxbymDu00xPFKBd0q";

const stripe = Stripe(SECRET_KEY, {apiVersion: "2022-08-01"})

app.listen(port, () => {
    console.log(`Example app listening at localhost:${port}`);
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: "usd",
            payment_method_types: ["card"],
        });
        const clientSecret = paymentIntent.clientSecret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
     console.log(e.message);
     res.json({error: e.message});
 }})