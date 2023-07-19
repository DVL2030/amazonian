import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    asin: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    images: [{ type: mongoose.SchemaTypes.Mixed }],
    overview: { type: mongoose.SchemaTypes.Mixed },
    information: { type: mongoose.SchemaTypes.Mixed },
    description: { type: mongoose.SchemaTypes.Mixed },
    tabularFeature: { type: mongoose.SchemaTypes.Mixed },
    brandInfo: { type: mongoose.SchemaTypes.Mixed },
    price: { type: mongoose.SchemaTypes.Mixed },
    available: { type: Boolean, required: true },
    availability: String,
    delivery: [String],
    reviewData: { type: mongoose.SchemaTypes.Mixed },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
