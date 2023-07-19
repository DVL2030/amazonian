import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import mongoose from "mongoose";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderedItems.length === 0) {
      return res.status(401).send({ message: "Cart is empty." });
    } else {
      try {
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
      } catch (error) {
        return res.status(404).send({ message: error.message });
      }
    }
  })
);

orderRouter.post(
  "/get",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { orderId, userId } = req.body;
    try {
      const order = await Order.findOne({
        userId: userId,
        "paymentResult.id": orderId,
      });
      if (order) {
        res.send(order);
      } else {
        return res.status(404).send({ message: "Order Not Found" });
      }
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  })
);

orderRouter.post(
  "/history",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    const id = new mongoose.Types.ObjectId(userId);

    try {
      const history = await Order.aggregate([
        { $match: { userId: id } },
        {
          $lookup: {
            from: "addresses",
            localField: "shippingAddress",
            foreignField: "_id",
            as: "shippingAddress",
          },
        },
      ]);

      return res.status(200).send(history);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  })
);

export default orderRouter;
