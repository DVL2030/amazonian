import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import Stripe from "stripe";

const stripeRouter = express.Router();

stripeRouter.get(
  "/getKey",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      res.status(200).send({ publicKey: process.env.STRIPE_USER_API });
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  })
);

stripeRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const final = req.body.amount;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: final,
        automatic_payment_methods: { enabled: true },
      });
      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  })
);

export default stripeRouter;
