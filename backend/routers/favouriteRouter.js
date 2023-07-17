import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../utils.js";
import Favourite from "../models/favouriteModel.js";
import Product from "../models/productModel.js";

const favRouter = express.Router();

favRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const { userId, item, type } = req.body;
    try {
      const add = await Favourite.update(
        { userId: userId },
        { $addToSet: { [type]: [item.asin || item.id] } }
      );

      if (type === "products")
        await Product.update(
          { asin: item.asin },
          { $setOnInsert: { _id: asin, ...item } },
          { upsert: true }
        );
      else if (type === "reviews")
        await Review.update(
          { _id: item.id },
          { $setOnInsert: { _id: id, ...item } },
          { upsert: true }
        );

      if (add) {
        return res.send({
          status: true,
        });
      } else {
        const newFav = await Favourite.create({
          userId: userId,
          [type]: [item.asin || item.id],
        });
        if (newFav) {
          return res.send({
            status: true,
          });
        } else {
          return res.status(401).send({
            message:
              "Failed to create a new Favourite Entry.. Please try again.",
          });
        }
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId, field, value } = req.body;

    try {
      const update = await User.findByIdAndUpdate(userId, { [field]: value });
      const newUser = await User.findById(userId);
      if (newUser) {
        return res.send({
          status: true,
          message: `You have successfully changed your ${field}.`,
        });
      } else {
        return res.send({
          status: false,
          message: `Failed to update your ${field}.. Please try again`,
        });
      }
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/getAddress",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
      const data = await Address.find({ userId: userId });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/saveAddress",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId;
    try {
      const newAddress = new Address({
        userId: req.body.userId,
        fullName: req.body.fullName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        country: req.body.country,
      });

      const addressCreated = await newAddress.save();
      if (addressCreated) res.send(addressCreated);
      return res.status(401).send({
        message: "Failed to create a new address",
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default favRouter;
