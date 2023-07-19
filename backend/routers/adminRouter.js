import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import Order from "../models/orderModel.js";
import { MONTHS } from "../constant.js";
import Product from "../models/productModel.js";
import Favourite from "../models/favouriteModel.js";
import Review from "../models/reviewModel.js";

const adminRouter = express.Router();

// New Orders
// New Users
// Total Traffic
// Total Revenue
// Income data by month

adminRouter.post(
  "/dashboard",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const total_orders = await Order.countDocuments();
      const old_orders = await Order.find({
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }).count();
      const total_users = await User.countDocuments();
      const old_users = await User.find({
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }).count();

      const new_orders = total_orders - old_orders;
      const new_users = total_users - old_users;
      const new_orders_percentage = Math.floor(
        100 - ((total_orders - old_orders) / total_orders) * 100
      );
      const new_users_percentage = Math.floor(
        100 - ((total_users - old_users) / total_users) * 100
      );

      const total_traffic = await User.aggregate([
        { $group: { _id: null, sum: { $sum: "$visits" } } },
      ]).then((res) => {
        return res[0].sum;
      });

      const total_revenue = await Order.aggregate([
        { $group: { _id: null, sum: { $sum: "$final" } } },
      ]).then((res) => {
        return res[0].sum;
      });

      const monthly_revenue = await Order.aggregate([
        {
          // change this to month later.
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            sum: { $sum: "$final" },
          },
        },
        { $limit: 12 },
      ]);
      const month = new Date().getMonth();
      const monthly_incomes = monthly_revenue.map((m, idx) => {
        return [
          MONTHS[month - idx],
          m.sum,
          Math.floor(m.sum * 0.7),
          Math.floor(m.sum * 0.3),
        ];
      });

      return res.status(200).send({
        total_revenue,
        total_traffic,
        monthly_incomes,
        new_orders,
        new_orders_percentage,
        new_users,
        new_users_percentage,
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

// Admin Order
// Total order count
// Most sold products
// List All Orders
adminRouter.post(
  "/order",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Total order
      const total_orders = await Order.countDocuments();

      // Total Tax Cost
      const total_tax = await Order.aggregate([
        { $group: { _id: null, sum: { $sum: "$tax" } } },
      ]).then((res) => {
        return res[0].sum;
      });

      // Total delivered
      const delivery_status = await Order.aggregate([
        { $group: { _id: "$isDelivered", count: { $sum: 1 } } },
      ]);

      const delivered = delivery_status.find((d) => d._id === true);
      const notDelivered = delivery_status.find((d) => d._id === false);

      delivery_status.push({
        stat: Math.floor(
          (delivered.count / (notDelivered.count + delivered.count)) * 100
        ),
      });

      // Group order by country
      const order_country = await Order.aggregate([
        {
          $lookup: {
            from: "addresses",
            localField: "shippingAddress",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $group: { _id: "$address.country", count: { $sum: 1 } },
        },
        {
          $limit: 4,
        },
      ]).then((res) => {
        return res.map((r) => {
          return { country: r._id[0], count: r.count };
        });
      });

      // Most sold products
      const most_sold = await Order.aggregate([
        { $unwind: "$orderedItems" },
        {
          $group: {
            _id: { asin: "$orderedItems.asin" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        {
          $lookup: {
            from: "products",
            localField: "_id.asin",
            foreignField: "asin",
            as: "product",
          },
        },
        { $limit: 18 },
      ]);

      const most_sold_products = most_sold
        .map((p) => {
          const product = p.product[0];

          if (product)
            return {
              asin: p._id.asin,
              count: p.count,
              title: product.title,
              current_price: product.price.currentPrice,
              before_price: product.price.beforePrice,
              discount: product.price.discount,
              rating: product.reviewData.avgRating,
              total_reviews: product.reviewData.totalReviewCount.split(" ")[0],
              available: product.available ? "yes" : "no",
            };
          else return;
        })
        .filter((x) => x !== undefined);

      // List All Orders
      const orders = await Order.find(
        {},
        {
          _id: 1,
          orderedItems: 1,
          paymentResult: 1,
          final: 1,
          tax: 1,
          isDelivered: 1,
          expectedDelivery: 1,
          createdAt: 1,
        }
      );

      const all_orders = orders.map((r) => {
        if (r)
          return {
            id: r._id,
            num_of_products: r.orderedItems.length,
            paymentId: r.paymentResult.id,
            final: r.final,
            tax: r.tax,
            isDelivered: r.isDelivered,
            expectedDelivery: new Date(r.expectedDelivery).toDateString(),
            date_of_order: new Date(r.createdAt).toDateString(),
          };
        else return;
      });

      return res.status(200).send({
        total_orders,
        total_tax,
        delivery_status,
        order_country,
        most_sold_products,
        all_orders,
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

// Admin User
// Total user counts
// Total user vists
// Most active users
// Patreon

adminRouter.post(
  "/user",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Total user counts
      const total_users = await User.countDocuments();

      // Total user vists
      const total_user_visits = await User.aggregate([
        { $group: { _id: null, sum: { $sum: "$visits" } } },
      ]).then((res) => {
        return res[0].sum;
      });

      const most_active_users = await User.aggregate([
        { $unset: "_id" },
        {
          $project: {
            email: "$email",
            name: "$name",
            phone: "$phone",
            isAdmin: "$isAdmin",
            visits: "$visits",
            date_of_register: "$createdAt",
            last_login: "$updatedAt",
          },
        },
        { $sort: { visits: -1, last_login: -1 } },
        { $limit: 20 },
      ]);

      // Most Patreon users
      //   const most_patreon_users = await Order.aggregate([
      //     {
      //       $group: {
      //         _id: { userId: "$userId" },
      //         final: { $sum: "$final" },
      //         count: { $sum: 1 },
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "_id.userId",
      //         foreignField: "_id",
      //         as: "userInfo",
      //       },
      //     },
      //     {
      //       $project: {
      //         email: "$userInfo.email",
      //         name: "$userInfo.name",
      //         phone: "$userInfo.phone",
      //         admin: "$userInfo.isAdmin",
      //         date_of_register: "$userInfo.createdAt",
      //         last_login: "$userInfo.updatedAt",
      //       },
      //     },
      //     { $sort: { final: -1, count: -1 } },
      //     { $limit: 20 },
      //   ]);

      // All users
      const all_users = await User.aggregate([
        { $unset: "_id" },
        {
          $project: {
            email: "$email",
            name: "$name",
            phone: "$phone",
            isAdmin: "$isAdmin",
            date_of_register: "$createdAt",
            last_login: "$updatedAt",
          },
        },
      ]);

      return res.status(200).send({
        total_users,
        total_user_visits,
        most_active_users,
        all_users,
      });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

// Admin Products
// Most Popular Products
// List All Products
// New Products
adminRouter.post(
  "/product",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Total Products
      const total_products = await Product.countDocuments();

      const all_products = await Product.aggregate([
        {
          $project: {
            _id: 0,
            asin: "$asin",
            title: "$title",
            current_price: "$price.currentPrice",
            before_price: "$price.beforePrice",
            discount: "$price.discount",
            rating: "$reviewData.avgRating",
            total_reviews: "$reviewData.totalReviewCount",
            available: "$available",
          },
        },
      ]);

      const most_popular_products = await Favourite.aggregate([
        { $unwind: "$products" },
        {
          $group: { _id: "$products", count: { $sum: 1 } },
        },
        { $sort: { count: -1 } },
        { $limit: 18 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 0,
            count: "$count",
            asin: "$product.email",
            title: "$product.title",
            current_price: "$product.price.currentPrice",
            before_price: "$product.price.beforePrice",
            discount: "$product.price.discount",
            rating: "$product.reviewData.avgRating",
            total_reviews: "$product.reviewData.totalReviewCount",
            available: "$product.available",
          },
        },
      ]);

      return res
        .status(200)
        .send({ total_products, all_products, most_popular_products });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

adminRouter.post(
  "/review",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Total Products
      const total_reviews = await Review.countDocuments();

      const all_reviews = await Review.find(
        {},
        {
          _id: 0,
          link: 0,
          imgs: 0,
        }
      );

      const most_popular_reviews = await Favourite.aggregate([
        { $unwind: "$reviews" },
        {
          $group: { _id: "$reviews", count: { $sum: 1 } },
        },
        { $sort: { count: -1 } },
        { $limit: 18 },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "_id",
            as: "review",
          },
        },
        { $unwind: "$review" },
        {
          $project: {
            _id: 0,
            count: "$count",
            name: "$review.name",
            star: "$review.star",
            date: "$review.date",
            strip: "$review.strip",
            title: "$review.title",
            helpful: "$review.helpful",
            verified: "$review.verified",
          },
        },
      ]);

      return res
        .status(200)
        .send({ total_reviews, all_reviews, most_popular_reviews });
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default adminRouter;
