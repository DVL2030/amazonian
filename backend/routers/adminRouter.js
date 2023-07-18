import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import Order from "../models/orderModel.js";

const adminRouter = express.Router();

// Total Revenue
// Total Orders
// Total Users

// Admin Order
// Most sold products
// List All Orders
// Total Revenue (by month)

// Admin Users
// Most Active Users
// List All Users

// Most Popular Products

// Most Popular Reviews

adminRouter.post(
  "/dashboard",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const total_orders = await Order.countDocuments();

      const total_users = await User.countDocuments();

      const total_revenue = await Order.aggregate([
        { $group: { _id: null, sum: { $sum: "$final" } } },
      ]);

      const monthly_revenue = await Order.aggregate([
        {
          // change this to month later.
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            sum: { $sum: "$final" },
          },
        },
      ]);

      return res.status(200).send({
        total_revenue: total_revenue[0].sum,
        monthly_revenue,
        total_orders,
        total_users,
      });
    } catch (error) {
      return res.status(401).send({
        message: `Failed to retrieve Dashboard Overview`,
      });
    }
  })
);

export default adminRouter;
