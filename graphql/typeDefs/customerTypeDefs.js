const { gql } = require("graphql-tag");

const customerTypeDefs = gql`
  type Customer {
    customerName: String!
    customerEmailAddress: String!
    isAdmin: Boolean!
    orders: [Order]!
  }
`;

module.exports = customerTypeDefs;
