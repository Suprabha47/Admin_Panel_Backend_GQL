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
  input ItemInput {
    itemName: String
    price: Float
    quantity: Int
  }
  type Address {
    fullName: String!
    address: String!
    city: String!
    pinCode: Int!
    country: String
  }
  input AddressInput {
    fullName: String!
    address: String!
    city: String!
    pinCode: Int!
    country: String
  }
  type Order {
    id: ID!
    customer: Customer!
    items: [Item]
    totalAmount: Float!
    status: OrderStatus!
    paymentMethod: String
    shippingAddress: Address!
    createdAt: String
  }

  input OrderInput {
    customerId: ID!
    items: [ItemInput]!
    status: OrderStatus!
    paymentMethod: String
    shippingAddress: AddressInput!
    createdAt: String
  }
  type PaginatedOrders {
    orders: [Order!]!
    totalCount: Int!
    totalPage: Int!
    currentPage: Int!
  }

  type Query {
    getOrder(id: ID!): Order
    getAllOrders: [Order!]!
    getPaginatedOrders(page: Int!, limit: Int!): PaginatedOrders
  }

  type Mutation {
    createOrder(input: OrderInput!): Order
    updateOrderStatus(id: ID!, status: OrderStatus!): Order
    deleteOrder(id: ID!): String
  }
`;

module.exports = orderTypeDefs;
