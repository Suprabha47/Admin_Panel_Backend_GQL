const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { InMemoryLRUCache } = require("@apollo/utils.keyvaluecache");
const { typeDefs, resolvers } = require("./graphql/index");
const connectDB = require("./config/db");
require("dotenv").config();

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3005 },
  });
  console.log("Server ready at port ", url);
};

startServer();
