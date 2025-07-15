const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./graphql/index");
const connectDB = require("./config/db");
require("dotenv").config();

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server
    .listen({
      port: process.env.PORT || 3005,
      cors: {
        origin: ["http://localhost:3005", "http://localhost:4000"],
      },
    })
    .then(({ url }) => console.log(`server ready at ${url}`));
};

startServer();
