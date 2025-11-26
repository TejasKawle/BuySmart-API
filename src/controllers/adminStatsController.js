import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";


// total of data's

export const getTotalCount=async (req,res,next) => {
  
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrder = await Order.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        products: totalProducts,
        orders:totalOrder
      }
    })
  } catch (error) {
    next(error);
  }
}


// order stats 
export const getOrderStats=async (req,res,next) => {

  try {
    const totalOrders = await Order.countDocuments();
    const totalDelivered = await Order.countDocuments({ status: "delivered" });
    const totalCancelled = await Order.countDocuments({ status: 'cancelled' });

      res.status(200).json({
        success: true,
        data: {
          totalOrders,
          totalDelivered,
          totalCancelled,
        },
      });
  } catch (error) {
    next(error);
  }
  
}

// revenue state
export const getRevenueStats=async (req,res,next) => {
  try {
    const revenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

      res.status(200).json({
        success: true,
        data: { totalRevenue },
      });
  } catch (error) {
    next(error);
  }
  
}