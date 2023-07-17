import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../utils.js";
import Favourite from "../models/favouriteModel.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

const favRouter = express.Router();

favRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const { userId, item, type } = req.body;

    try {
      let product, review;
      if (type === "products") {
        const product_exist = await Product.findOne({ asin: item.asin });
        if (product_exist) {
          product = product_exist;
        } else {
          product = await Product.create(item);
        }
      } else if (type === "reviews") {
        const review_exist = await Product.findOne({ asin: item.asin });
        if (review_exist) {
          review = review_exist;
        } else {
          review = await Review.create(item);
        }
      }
      const userFav = await Favourite.findOne({ userId: userId });
      if (userFav) {
        const addToFav = await Favourite.updateOne(
          { userId: userId },
          { $addToSet: { [type]: product._id || review._id } }
        );
        if (!addToFav.acknowledged)
          return res.status(401).send({
            message: "Failed to add a favourite",
          });
      } else {
        const newFav = await Favourite.create({
          userId: userId,
          [type]: [product._id || review._id],
        });
        if (!newFav)
          return res.status(401).send({
            message: `Failed to create a new Favourite for user ${userId}`,
          });
      }
      return res.send({
        status: true,
      });
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
