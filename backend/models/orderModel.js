import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderedItems: [
      {
        asin: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        qty: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
    },
    shippingPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    final: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    dateOfPayment: { type: Date },
    isDelivered: { type: Boolean, default: false },
    expectedDelivery: { type: Date, required: true },
    dateOfDelivery: { type: Date },
    eligibleReturnDate: { type: Date, required: true },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
