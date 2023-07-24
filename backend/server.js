import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import http from "http";
import path from "path";

import userRouter from "./routers/userRouter.js";
import amazonRouter from "./routers/amazonRouter.js";

import orderRouter from "./routers/orderRouter.js";
import favRouter from "./routers/favouriteRouter.js";
import adminRouter from "./routers/adminRouter.js";
import stripeRouter from "./routers/stripeRouter.js";
import productRouter from "./routers/productRouter.js";

dotenv.config();

const port = process.env.port || 5000;

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://dlee2307:Bb3Kyrjuh47zYBhW@amazonian.yg8r19r.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongo DB connected successfully");
});

app.use("/api/users", userRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/amazon", amazonRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/favourite", favRouter);
app.use("/api/admin", adminRouter);

app.use(express.static(path.join(__dirname, "frontend/build")));
// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "frontend/build/index.html"));
// });
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// const httpServer = http.Server(app);

// httpServer.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
