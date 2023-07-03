import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({}); //
    const usersPopulated = await User.insertMany(data.users);
    res.send({ usersPopulated });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        return res.status(401).send({ message: "Password is not correct." });
      }
    } else {
      return res.status(401).send({
        message: `No user with email ${req.body.email} has been found.`,
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password: plainTextPassword } = req.body;
    const password = bcrypt.hashSync(plainTextPassword);
    try {
      const newUser = await User.create({ name, email, password });
      if (newUser) {
        return res.send({
          status: "success",
          message:
            "You have successfully create account. You will be redirected to home page soon..",
        });
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(401).send({
          status: "error",
          message:
            "A user with that email has already registered. Please use a different email..",
        });
      }
    }
  })
);

userRouter.post(
  "/getAddress",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (userId == null || userId.length == 0)
      return res.status(401).send({
        message: "You need a user ID to save this address",
      });
    try {
      const data = await Address.find({ userId: userId });
      Address.find();
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

userRouter.post(
  "/saveAddress",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId;

    if (userId == null || userId.length == 0)
      return res.status(401).send({
        message: "You need a user ID to create a new address",
      });
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

      if (data) return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default userRouter;
