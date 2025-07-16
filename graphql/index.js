const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const userTypeDefs = require("./typeDefs/userTypeDefs");
const productTypeDefs = require("./typeDefs/productTypeDefs");
const userResolvers = require("./resolvers/userResolver");
const productResolvers = require("./resolvers/productResolver");
const categoryTypeDefs = require("./typeDefs/categoryTypeDefs");
const categoryResolvers = require("./resolvers/categoryResolver");
const customerTypeDefs = require("./typeDefs/customerTypeDefs");
const orderTypeDefs = require("./typeDefs/orderTypeDefs");

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  productTypeDefs,
  categoryTypeDefs,
  customerTypeDefs,
  orderTypeDefs,
]);
const resolvers = mergeResolvers([
  userResolvers,
  productResolvers,
  categoryResolvers,
]);

module.exports = { typeDefs, resolvers };
