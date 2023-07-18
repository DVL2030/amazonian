import express from "express";
import expressAsyncHandler from "express-async-handler";

import { isAuth } from "../utils.js";
import Favourite from "../models/favouriteModel.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";

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
        const review_exist = await Review.findOne({ id: item.id });
        if (review_exist) {
          review = review_exist;
        } else {
          review = await Review.create(item);
          console.log(review);
        }
      }

      const id = product ? product._id : review ? review._id : null;
      const userFav = await Favourite.findOne({ userId: userId });
      if (userFav) {
        const addToFav = await Favourite.updateOne(
          { userId: userId },
          { $addToSet: { [type]: id } }
        );

        if (!addToFav.acknowledged)
          return res.status(401).send({
            message: "Failed to add a favourite",
          });
      } else {
        const newFav = await Favourite.create({
          userId: userId,
          [type]: [id],
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
  "/remove",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId, id, type } = req.body;

    try {
      const removeFromFav = await Favourite.updateOne(
        { userId: userId },
        { $pullAll: { [type]: id } }
      );
      return res.send({
        message: "You have successfully removed your favourite item",
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/getProducts",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    const id = new mongoose.Types.ObjectId(userId);

    try {
      const products = await Favourite.aggregate([
        { $match: { userId: id } },
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);

      return res.send(products[0].products);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/getReviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    const id = new mongoose.Types.ObjectId(userId);

    try {
      const reviews = await Favourite.aggregate([
        { $match: { userId: id } },
        {
          $lookup: {
            from: "reviews",
            localField: "reviews",
            foreignField: "_id",
            as: "reviews",
          },
        },
      ]);

      return res.send(reviews[0].reviews);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default favRouter;
