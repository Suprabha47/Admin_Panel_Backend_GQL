const Order = require("../../models/orderModel");
const Customer = require("../../models/customerModel");

const orderResolvers = {
  Order: {
    id: (parent) => parent._id.toString(),
  },
  Query: {
    getOrder: async (_, { id }) => {
      const order = await Order.findById(id)
        .populate("customer")
        .populate("items");
      if (!order) throw new Error("No such order exists!");
      return order;
    },
    getAllOrders: async () =>
      await Order.find().populate("customer").populate("items"),
  },
  Mutation: {
    createOrder: async (_, { input }) => {
      const { customerId, items, status, paymentMethod, shippingAddress } =
        input;

      const customer = await Customer.findById(customerId);
      if (!customer) throw new Error("Customer not found!");

      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newOrder = await Order.create({
        customer: customerId,
        items: Array.isArray(items) ? items : [],
        totalAmount,
        status,
        paymentMethod,
        shippingAddress,
      });
      customer.orders.push(newOrder._id);
      await customer.save();

      return await newOrder.populate("customer");
    },
    updateOrderStatus: async (_, { id, status }) => {
      const order = await Order.findById(id);
      if (!order) throw new Error("This order doesn't exist!");
      order.status = status;
      await order.save();
      return await order.populate("customer");
    },
    deleteOrder: async (_, { id }) => {
      const order = await Order.findById(id);
      if (!order) throw new Error("Order doesn't exist!");
      else await Order.findByIdAndDelete(id);
      // Remove order ID from customer.orders
      await Customer.findByIdAndUpdate(order.customer, {
        $pull: { orders: order._id },
      });
      return "Order removed successfully!";
    },
  },
};

module.exports = orderResolvers;
