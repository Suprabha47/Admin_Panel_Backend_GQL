const Coupon = require("../../models/couponModel");

const couponResolvers = {
  Query: {
    getAllCoupons: async () => await Coupon.find(),
    getCouponById: async (_, { id }) => {
      const coupon = await Coupon.findById(id);
      if (!coupon) throw new Error("No such coupon exists");
      return coupon;
    },
  },
  Mutation: {
    createCoupon: async (_, { input }, context) => {
      if (!context.user) throw new Error("Not Authenticated!");
      const { couponCode } = input;
      const exists = await Coupon.findOne({
        couponCode,
      });
      if (exists) throw new Error("Coupon already exists!");
      const coupon = await Coupon.create(input);
      return coupon;
    },
    deleteCoupon: async (_, { id }, context) => {
      if (!context.user) throw new Error("Not authenticated!");
      try {
        const deleted = await Coupon.findByIdAndDelete(id);
        if (!deleted) throw new Error("Coupon not found!");
        return "Coupon deleted successfully!";
      } catch (err) {
        console.log("error: ", err);
        throw new Error("Failed to delete the coupon");
      }
    },
  },
};

module.exports = couponResolvers;
