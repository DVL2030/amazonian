import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avater: { type: String },
  star: { type: String, required: true },
  date: { type: String },
  strip: { type: mongoose.SchemaTypes.Mixed },
  title: { type: mongoose.SchemaTypes.Mixed },
  link: { type: mongoose.SchemaTypes.Mixed },
  content: { type: mongoose.SchemaTypes.Mixed },
  helpful: { type: Number, required: true },
  imgs: { type: Number, required: true },
  verified: { type: Boolean },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
