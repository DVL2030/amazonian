import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import amazonRouter from "./routers/amazonRouter.js";
import Stripe from "stripe";
import orderRouter from "./routers/orderRouter.js";
import favRouter from "./routers/favouriteRouter.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {});

app.get("/api/config/key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_USER_API });
});

app.post("/api/config/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: req.body.amount,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
});

app.use("/api/users", userRouter);
app.use("/api/amazon", amazonRouter);
app.use("/api/order", orderRouter);
app.use("/api/favourite", favRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://127.0.0.1:${port}`);
});
