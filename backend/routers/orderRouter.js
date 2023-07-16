import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderedItems.length === 0) {
      return res.status(401).send({ message: "Cart is empty." });
    } else {
      const order = new Order({
        userId: req.user._id,
        orderedItems: req.body.orderedItems,
        shippingAddress: req.body.shippingAddress,
        shippingPrice: req.body.shippingPrice,
        paymentResult: req.body.paymentResult,
        total: req.body.total,
        tax: req.body.tax,
        final: req.body.final,
        expectedDelivery: req.body.expectedDelivery,
        eligibleReturnDate: req.body.eligibleReturnDate,
      });
      const newOrder = await order.save();
      return res
        .status(201)
        .send({ message: "Created new order.", order: newOrder });
    }
  })
);

orderRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findOne({ "paymentResult.id": orderId });
    if (order) {
      res.send(order);
    } else {
      return res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.send(orders);
    } else {
      res.send({
        message: "You haven't made any order with Amazonian Yet. Go shopping!",
      });
    }
  })
);

export default orderRouter;
