const Customer = require("../../models/customerModel");

const customerResolver = {
  Customer: {
    id: (parent) => parent._id.toString(),
  },
  Query: {
    getCustomer: async (_, { id }) =>
      await Customer.findById(id).populate("orders"),
    getAllCustomers: async () => await Customer.find().populate("orders"),
  },
  Mutation: {
    createCustomer: async (_, { input }) => {
      try {
        const { customerEmailAddress } = input;
        const exists = await Customer.findOne({ customerEmailAddress });
        if (exists) throw new Error("Customer Already Exists!");
        const newCustomer = await Customer.create({ ...input });
        return newCustomer;
      } catch (err) {
        console.log("Error: ", err);
        return err;
      }
    },
    deleteCustomer: async (_, { id }) => {
      const exists = await Customer.findById(id);
      if (!exists) throw new Error("This customer doesn't exist.");
      await Customer.findByIdAndDelete(id);
      return "Customer deleted successfully!";
    },
  },
};
module.exports = customerResolver;
