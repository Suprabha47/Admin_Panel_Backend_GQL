const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);
const itemSchema = new Schema(
  {
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderDataSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [itemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
  },
  paymentMethod: { type: String, required: true },
  shippingAddress: addressSchema,
});

module.exports = model("Order", OrderDataSchema);
