const { gql } = require("graphql-tag");

const orderTypeDefs = gql`
  enum OrderStatus {
    PENDING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type Item {
    itemName: String!
    price: Float!
    quantity: Int!
  }

  type Address {
    fullName: String!
    address: String!
    city: String!
    pinCode: Int!
    country: String
  }

  type Order {
    id: ID!
    customer: Customer!
    items: [Item]!
    totalAmount: Float!
    status: OrderStatus!
    paymentMethod: String
    shippingAddress: Address!
  }
`;

module.exports = orderTypeDefs;
