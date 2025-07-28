const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  console.log("user Id: ", userId);
  return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

module.exports = generateToken;
