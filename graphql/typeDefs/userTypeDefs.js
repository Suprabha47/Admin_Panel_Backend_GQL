const { gql } = require("graphql-tag");

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

  type AuthResponse {
    user: User!
    token: String!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User!
  }

  type Mutation {
    signIn(email: String!, password: String!): AuthResponse

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
      email: String!
      photoUrl: String
    ): AuthResponse
  }
`;

module.exports = userTypeDefs;
