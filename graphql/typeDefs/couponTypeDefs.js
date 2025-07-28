const { gql } = require("graphql-tag");

const couponTypeDefs = gql`
  type Coupon {
    id: ID!
    couponName: String!
    couponCode: String!
    couponType: CouponType!
    discountValue: Float
    appliesTo: String
    duration: String
    noDuration: Boolean
    usageLimit: Int
    noUsageLimit: Boolean
    createdAt: String
    updatedAt: String
  }

  input CouponInput {
    couponName: String!
    couponCode: String!
    couponType: CouponType!
    discountValue: Float
    appliesTo: String
    duration: String
    noDuration: Boolean
    usageLimit: Int
    noUsageLimit: Boolean
  }

  enum CouponType {
    FIXED
    PERCENTAGE
    FREE_SHIPPING
    PRICE_DISCOUNT
  }
  type Query {
    getAllCoupons: [Coupon!]!
    getCouponById(id: ID!): Coupon
  }

  type Mutation {
    createCoupon(input: CouponInput!): Coupon
    deleteCoupon(id: ID!): String
  }
`;

module.exports = couponTypeDefs;
