const Category = require("../../models/categoryModel");

const categoryResolver = {
  Query: {
    getCategory: async (_, { id }) => await Category.findById(id),
    getAllCategories: async () => await Category.find(),
  },
  Mutation: {
    createCategory: async (_, args) => {
      const { categoryName, categoryDescription } = args;
      const exists = await Category.findOne({ categoryName });
      if (exists) throw new Error("Category already exists!");
      const newCategory = new Category({ categoryName, categoryDescription });
      return await newCategory.save();
    },
    updateCategory: async (_, args) => {
      const { id, categoryName, categoryDescription } = args;
      return await Category.findByIdAndUpdate(
        id,
        { categoryName, categoryDescription },
        { new: true }
      );
    },
    deleteCategory: async (_, { id }) => {
      const exists = await Category.findById(id);
      if (!exists) throw new Error("No such category found");
      await Category.findByIdAndDelete(id);
      return "Category Deleted";
    },
  },
};

module.exports = categoryResolver;
