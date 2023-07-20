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
  isAuth,
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

      return res.status(200).send({
        message: `Successfully add ${type} to your favourite!`,
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
    console.log(id);
    try {
      const removeFromFav = await Favourite.updateOne(
        { userId: userId },
        { $pullAll: { [type]: [id] } }
      );
      return res.status(200).send({
        status: true,
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
      if (products.length === 0) return res.status(200).send([]);
      else return res.status(200).send(products[0].products);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/getProductAsins",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    try {
      const id = new mongoose.Types.ObjectId(userId);
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
        {
          $project: {
            asin: "$products.asin",
            id: "$products._id",
          },
        },
      ]);
      const favProds = [];
      for (let i = 0; i < products[0].asin.length; i++) {
        let json = { asin: products[0].asin[i], id: products[0].id[i] };
        favProds.push(json);
      }

      return res.status(200).send(favProds);
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

    try {
      const id = new mongoose.Types.ObjectId(userId);
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

      if (reviews.length === 0) return res.status(200).send([]);
      else return res.status(200).send(reviews[0].reviews);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

favRouter.post(
  "/getReviewIds",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    try {
      const id = new mongoose.Types.ObjectId(userId);
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
        {
          $project: {
            _id: "$reviews._id",
            id: "$reviews.id",
          },
        },
      ]);
      const favReviews = [];
      for (let i = 0; i < reviews[0]._id.length; i++) {
        let json = { _id: reviews[0]._id[i], id: reviews[0].id[i] };
        favReviews.push(json);
      }

      return res.status(200).send(favReviews);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default favRouter;
