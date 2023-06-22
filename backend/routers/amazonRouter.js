import express from "express";
import expressAsyncHandler from "express-async-handler";

import AmazonScrape from "../AmazonScrape.js";

const amazonRouter = express.Router();

amazonRouter.get(
  "/home",
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await AmazonScrape({ type: "home" });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

amazonRouter.get(
  "/products",
  expressAsyncHandler(async (req, res) => {})
);

amazonRouter.get(
  "/productAsin",
  expressAsyncHandler(async (req, res) => {})
);

amazonRouter.get(
  "/reviews",
  expressAsyncHandler(async (req, res) => {})
);

amazonRouter.get(
  "/reviewAsin",
  expressAsyncHandler(async (req, res) => {})
);

export default amazonRouter;
