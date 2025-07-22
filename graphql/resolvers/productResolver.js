const Product = require("../../models/productModel");

const productResolver = {
  Query: {
    getProduct: async (_, { id }) => await Product.findById(id),
    getAllProducts: async () => await Product.find(),
    getPaginatedProducts: async (_, { page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit;
      const totalCount = await Product.countDocuments();
      const totalPage = Math.ceil(totalCount / limit);
      const products = await Product.find().skip(skip).limit(limit);
      return { products, totalCount, totalPage, currentPage: page };
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const { productName, productDescription } = input;
      const exists = await Product.findOne({ productName, productDescription });
      if (exists) throw new Error("Product already exists!");
      const newProduct = new Product(input);
      return await newProduct.save();
    },
    updateProduct: async (_, { id, input }) => {
      return await Product.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      const exists = await Product.findById(id);
      if (!exists) throw new Error("No such product found");
      await Product.findByIdAndDelete(id);
      return "Product deleted successfully!";
    },
  },
};

module.exports = productResolver;
