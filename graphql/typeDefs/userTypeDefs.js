const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String
    googleId: String
    photoUrl: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    signIn(email: String!, password: String!): User

    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): String!

    googleAuth(
      googleId: String!
      firstName: String
      lastName: String
      photoUrl: String
    ): User
  }
`;

module.exports = userTypeDefs;
