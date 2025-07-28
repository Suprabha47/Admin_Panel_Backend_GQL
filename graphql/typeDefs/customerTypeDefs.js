const { gql } = require("graphql-tag");

const customerTypeDefs = gql`
  type Customer {
    id: ID!
    customerName: String!
    customerEmailAddress: String!
    location: String!
    isAdmin: Boolean
    orders: [Order!]!
  }
  input CustomerInput {
    customerName: String!
    customerEmailAddress: String!
    location: String
    isAdmin: Boolean
  }
  type Query {
    getCustomer(id: ID!): Customer
    getAllCustomers: [Customer!]!
    getCustomerCount: Int!
    getTopCustomers: Customer
  }
  type Mutation {
    createCustomer(input: CustomerInput!): Customer
    deleteCustomer(id: ID!): String
  }
`;

module.exports = customerTypeDefs;
