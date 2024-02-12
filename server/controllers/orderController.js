import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate("user", "id email firstName lastName");

    res.status(200).json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Get logged in user orders
// @route POST /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const orders = await Order.find({
      user: req.userCredentials._id,
    })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const count = await Order.countDocuments({
      user: req.userCredentials._id,
    });

    if (orders) {
      res.status(200).json({
        orders,
        page,
        pages: Math.ceil(count / pageSize),
        count,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Creates a new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingInformation, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order items" });
    } else {
      // get the ordered items from our database
      const itemsFromDB = await Product.find({
        _id: { $in: orderItems.map((x) => x._id) },
      });

      // map over the order items and use the price from our items from database
      const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
          (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );
        return {
          ...itemFromClient,
          product: itemFromClient._id,
          price: matchingItemFromDB.prices[itemFromClient.size],
          _id: undefined,
        };
      });

      // calculate prices
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrices(dbOrderItems);

      const order = new Order({
        orderItems: dbOrderItems,
        user: req.userCredentials._id,
        shippingInformation,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(200).json({
        message:
          "Product order placed successfully. Check your profile to view your orders.",
        order: createdOrder,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error("Payment not verified");

    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error("Transaction has been used before");

    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.paymentMethod === "PayPal") {
        // check the correct amount was paid
        const totalPriceRounded = order.totalPrice.toFixed(2); // Round totalPrice to 2 decimal places
        const valueRounded = parseFloat(value).toFixed(2); // Parse value as float and round to 2 decimal places

        const paidCorrectAmount = totalPriceRounded === valueRounded;

        if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.status(200).json({
          message: "Payment Successful",
          data: updatedOrder,
        });
      } else {
        // Handle other payment methods or provide appropriate response
        res.status(400).json({ message: "Unsupported payment method" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Update cod order to paid
// @route PUT /api/orders/:id/cod/pay
// @access Private/Admin
const updateCodOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.paymentMethod === "COD") {
      // For COD, update order as paid
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();

      res.status(200).json({
        message: "Order updated successfully",
        data: updatedOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Update order status
// @route PUT /api/orders/:id/status
// @access Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Validate the incoming status value against enum values
      if (Order.schema.path("status").enumValues.includes(req.body.status)) {
        const previousStatus = order.status;
        order.status = req.body.status;

        if (req.body.status === "Delivered" && previousStatus !== "Delivered") {
          // Update the deliveryDate only if the status is changing to "Delivered" and it wasn't already "Delivered"
          order.deliveryDate = Date.now();
        }

        const updatedOrder = await order.save();
        res.status(200).json({
          message: "Order updated successfully",
          data: updatedOrder,
        });
      } else {
        res.status(400).json({ message: "Invalid status value" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderStatus,
  updateCodOrderToPaid,
};
