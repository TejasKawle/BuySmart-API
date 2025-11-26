import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { shippingAddress, paymentMethod = "cod" } = req.body;

      // Load user and populate cart.product inside the session
      const user = await User.findById(req.user._id)
        .populate("cart.product", "name price stock")
        .session(session);

      if (!user || user.cart.length === 0) {
        // Throw to abort transaction
        throw Object.assign(new Error("Your cart is empty"), {
          statusCode: 400,
        });
      }

      // Prepare order items and validate stock
      const items = [];
      let itemPrice = 0;

      for (const cartItem of user.cart) {
        const product = cartItem.product;
        const qty = cartItem.quantity;

        if (!product) {
          throw Object.assign(new Error("Product missing in DB"), {
            statusCode: 404,
          });
        }

        if (product.stock < qty) {
          throw Object.assign(
            new Error(`Not enough stock for product: ${product.name}`),
            { statusCode: 400 }
          );
        }

        items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          qty,
        });

        itemPrice += product.price * qty;
      }

      const taxPrice = +(itemPrice * 0.18).toFixed(2);
      const shippingPrice = itemPrice > 1000 ? 0 : 50;
      const totalPrice = itemPrice + taxPrice + shippingPrice;

      // Decrement stock for each product (atomic, inside session)
      // Using findByIdAndUpdate with $inc and session to avoid race conditions
      for (const cartItem of user.cart) {
        const productId = cartItem.product._id;
        const qty = cartItem.quantity;

        const updated = await Product.findOneAndUpdate(
          { _id: productId, stock: { $gte: qty } }, 
          { $inc: { stock: -qty } },
          { new: true, session }
        );

        if (!updated) {
          // If update failed because stock became insufficient between check & update
          throw Object.assign(
            new Error(`Failed to decrease stock for product ${productId}`),
            { statusCode: 400 }
          );
        }
      }

      // Create the order inside the session
      const order = await Order.create(
        [
          {
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            status: "created",
          },
        ],
        { session }
      );

      // Clear user cart inside the session
      user.cart = [];
      await user.save({ session });

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order[0],
      });
    });
  } catch (err) {
    const status = err.statusCode || 500;
    next(Object.assign(err, { statusCode: status }));
  } finally {
    session.endSession();
  }
};

// get my order (usr)

export const getMyOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "no order avaiable currently",
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// get single order
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("item.product", "name price image");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ensure user can access only their order
    if (order.user._id.toString() != req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// get all orders (admin route)

export const getAllorders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// update order status (admin route)

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowed = [
      "created",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    
    if (status === "delivered" && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }

    await order.save();
    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
