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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "-googleId -photoUrl -lastName"
    );
    // console.log("User fetched from DB: ", user);
    return user;
  } catch (err) {
    console.error("Error in getUserFromToken:", err.message);
    return null;
  }
};

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      const user = await getUserFromToken(token);
      return { user };
    },
    listen: { port: process.env.PORT || 3005 },
  });
  console.log("Server ready at port ", url);
};

startServer();
