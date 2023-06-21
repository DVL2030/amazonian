import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth, isAdmin } from "../utils.js";

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
      return res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser),
      });
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

export default userRouter;
