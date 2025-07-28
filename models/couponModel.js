const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CouponSchema = new Schema(
  {
    couponName: { type: String, required: true },
    couponCode: { type: String, required: true, unique: true, trim: true },
    couponType: {
      type: String,
      required: true,
      enum: ["FIXED", "PERCENTAGE", "FREE_SHIPPING", "PRICE_DISCOUNT"],
    },
    discountValue: {
      type: Number,
    },
    appliesTo: {
      type: String,
    },
    duration: { type: String },
    noDuration: { type: Boolean, default: false },
    usageLimit: { type: Number },
    noUsageLimit: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Coupon", CouponSchema);
