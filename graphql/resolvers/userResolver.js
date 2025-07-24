const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const userResolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      if (!context.user) throw new Error("User not authenticated!");
      return await User.find();
    },
    getUserById: async (_, id) => {
      const exists = await User.findById(id);
      if (!exists) return "User doesn't exist!";
      return exists;
    },
  },
  Mutation: {
    signIn: async (_, { email, password }) => {
      const isUser = await User.findOne({ email }).select("+password");
      if (!isUser) throw new Error("Invalid Credentials!");

      const isMatch = await bcrypt.compare(password, isUser.password);
      if (!isMatch) throw new Error("Invalid Credentials");
      const token = generateToken(isUser._id);
      return { user: isUser, token };
    },
    signUp: async (_, args) => {
      const { email, password } = args;
      const exists = await User.findOne({ email });
      if (exists) return "User already exists";
      const hashedPwd = await bcrypt.hash(password, 12);
      await User.create({ ...args, password: hashedPwd });
      return "User registered.";
    },
    googleAuth: async (_, args) => {
      const { email } = args;
      const exists = await User.findOne({ email });
      if (exists) {
        const token = generateToken(exists._id);
        return { user: exists, token };
      }
      const newUser = await User.create(args);
      if (!newUser) {
        throw new Error("Failed to create user with Google");
      }
      const token = generateToken(newUser._id);
      return { user: newUser, token };
    },
  },
};

module.exports = userResolvers;
