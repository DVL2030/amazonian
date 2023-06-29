import express from "express";
import expressAsyncHandler from "express-async-handler";

const orderRouter = express.Router();

orderRouter.get(
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

orderRouter.post(
  "/products",
  expressAsyncHandler(async (req, res) => {
    const { keyword, department, page } = req.body;
    try {
      const data = await AmazonScrape({
        type: "products",
        keyword: keyword,
        department: department,
        page: page,
      });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

orderRouter.post(
  "/productAsin",
  expressAsyncHandler(async (req, res) => {
    const { asin } = req.body;
    try {
      const data = await AmazonScrape({
        type: "productAsin",
        asin: asin,
      });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

orderRouter.post(
  "/reviews",
  expressAsyncHandler(async (req, res) => {
    const { asin, reviewFilter } = req.body;
    try {
      const data = await AmazonScrape({
        type: "reviews",
        asin: asin,
        reviewFilter: reviewFilter,
      });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

orderRouter.post(
  "/reviewID",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
      const data = await AmazonScrape({
        type: "reviewID",
        reviewId: id,
      });
      return res.send(data);
    } catch (error) {
      return res.status(401).send({
        message: error.message,
      });
    }
  })
);

export default orderRouter;
