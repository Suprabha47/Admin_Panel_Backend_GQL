const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { InMemoryLRUCache } = require("@apollo/utils.keyvaluecache");
const { typeDefs, resolvers } = require("./graphql/index");
const connectDB = require("./config/db");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserFromToken = async (token) => {
  try {
    if (!token) return null;
    console.log("tokenn received? ", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log("user? ", user);
    return user;
  } catch (err) {
    return null;
  }
};

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
    context: async ({ req }) => {
      const token = req.headers?.authorization?.split(" ")[1]; // authorization: bearer token...
      if (!token) return "Invalid Token!";
      const user = await getUserFromToken(token);
      return { user };
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3005 },
  });
  console.log("Server ready at port ", url);
};

startServer();
