import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


const port = process.env.port || 5000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1/amazonian", {
    useNewUrlParser: true,
});

app.get("/", (req, res) => {

});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`serve at http://127.0.0.1:${port}`);
});