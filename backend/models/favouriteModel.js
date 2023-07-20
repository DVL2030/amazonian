import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
