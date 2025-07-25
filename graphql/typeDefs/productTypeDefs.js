const { gql } = require("graphql-tag");

const productTypeDefs = gql`
  type Product {
    id: ID!
    productName: String!
    productDescription: String!
    price: Float!
    discountPrice: Float!
    image: String
    category: String!
    seoTitle: String
    seoDescription: String!
  }
  input ProductInput {
    productName: String!
    productDescription: String!
    price: Float!
    discountPrice: Float!
    image: String
    category: String!
    seoTitle: String
    seoDescription: String!
  }

  input ProductUpdateInput {
    productName: String
    productDescription: String
    price: Float
    discountPrice: Float
    image: String
    category: String
    seoTitle: String
    seoDescription: String
  }

  type PaginatedProducts {
    products: [Product!]!
    totalCount: Int!
    totalPage: Int!
    currentPage: Int!
  }

  type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product]
    getPaginatedProducts(page: Int!, limit: Int!): PaginatedProducts!
  }

  type Mutation {
    createProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductUpdateInput): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = productTypeDefs;
