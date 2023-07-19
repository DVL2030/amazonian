import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 20 },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    visits: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
