const User = require("../../models/userModel");

const userResolvers = {
  Query: {
    getUsers: async () => await User.find(),
  },
  Mutation: {
    signIn: async (_, { email, password }) => {
      const isUser = await User.findOne({ email, password });
      if (!isUser) throw new Error("Invalid Credentials!");
      return isUser;
    },
    signUp: async (_, args) => {
      const { email } = args;
      const exists = await User.findOne({ email });
      if (exists) return "User already exists";
      await User.create(args);
      return "User registered.";
    },
    googleAuth: async (_, args) => {
      const { email } = args;
      const exists = await User.findOne({ email });
      if (exists) return exists;
      const newUser = await User.create(args);
      return newUser;
    },
  },
};

module.exports = userResolvers;
