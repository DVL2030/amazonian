import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  asin: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  images: [{ type: String, required: true }],
  overview: { type: [String], required: true },
  description: { type: [String], required: true },
  overview: { type: mongoose.SchemaTypes.Mixed },
  description: { type: mongoose.SchemaTypes.Mixed },
  tabularFeature: { type: mongoose.SchemaTypes.Mixed },
  brandInfo: { type: mongoose.SchemaTypes.Mixed },
  currentPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  available: { type: Boolean, required: true },
  maxQty: { type: Number },
  reviewData: { type: mongoose.SchemaTypes.Mixed },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
