import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.post(
  "/getAsin",
  expressAsyncHandler(async (req, res) => {
    const asin = req.body.asin;
    try {
      const newProduct = await Product.findOne({ asin: asin });
      if (newProduct) return res.status(201).send(newProduct);
      else res.status(401).send({ message: "No product Has been found." });
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  })
);

productRouter.post(
  "/save",
  expressAsyncHandler(async (req, res) => {
    const product = req.body.product;
    try {
      const newProduct = await Product.create(product);
      if (newProduct) return res.status(201).send(true);
      else
        return res.status(401).send({ message: "Unexpected Error occurred.." });
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  })
);

export default productRouter;
