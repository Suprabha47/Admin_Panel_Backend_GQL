const { gql } = require("graphql-tag");

const categoryTypeDefs = gql`
  type Category {
    id: ID!
    categoryName: String!
    categoryDescription: String
    categoryImage: String
  }

  type Query {
    getCategory(id: ID!): Category
    getAllCategories: [Category]
  }

  type Mutation {
    createCategory(
      categoryName: String!
      categoryDescription: String
      categoryImage: String
    ): Category

    updateCategory(
      id: ID!
      categoryName: String!
      categoryDescription: String
      categoryImage: String
    ): Category

    deleteCategory(id: ID!): String
  }
`;

module.exports = categoryTypeDefs;
