const { gql } = require("apollo-server");

const categoryTypeDefs = gql`
  type Category {
    id: ID!
    categoryName: String!
    categoryDescription: String
  }

  type Query {
    getCategory(id: ID!): Category
    getAllCategories: [Category]
  }

  type Mutation {
    createCategory(categoryName: String!, categoryDescription: String): Category
    updateCategory(
      id: ID!
      categoryName: String!
      categoryDescription: String
    ): Category
    deleteCategory(id: ID!): String
  }
`;

module.exports = categoryTypeDefs;
