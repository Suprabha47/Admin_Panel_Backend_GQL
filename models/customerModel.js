const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CustomerDataSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  location: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = model("Customer", CustomerDataSchema);
