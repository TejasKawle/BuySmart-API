import User from "../models/User.js";
import Product from "../models/Product.js";


// add product to cart
export const addToCart=async (req,res,next) => {

  try {
    const { quantity = 1 } = req.body;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message:'product id is required'
      })
    }

    // check if product exist

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message:'product not found'
      })
    }

    // get the user cart

    const user = await User.findById(req.user._id);

    // check if product already in the cart
    const prod = user.cart.find((item) => item.product.toString() == productId);

    if (prod) {
      prod.quantity += quantity;
    } else {
      user.cart.push({product:productId,quantity})
    }

    await user.save();

      res.status(200).json({
        success: true,
        message: "Product added to cart",
        cart: user.cart,
      });
  } catch (error) {
    next(error);
  }
  
}

// get logged in user cart

export const getCart=async (req,res,next) => {

  try {
    const user = await User.findById(req.user._id).populate("cart.product", "name price image stock");

    res.status(200).json({
      success: true,
      count: user.cart.length,
      cart:user.cart
    })
  } catch (error) {
    next(error);
  }
  
}

// update cart item quantity

export const updateCartQuantity=async (req,res,next) => {

  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message:'qunatity must be atleast 1'
      })
    }

    const user = await User.findById(req.user._id);

    const item = user.cart.find((item) => item.product.toString() == productId);

     if (!item) {
       return res.status(404).json({
         success: false,
         message: "Item not found in cart",
       });
    }
    
    item.quantity = quantity;
    await User.save();
      res.status(200).json({
        success: true,
        message: "Cart item updated",
        cart: user.cart,
      });

  } catch (error) {
    next(error);
  }
  
}

// remove cart item

export const removeCartItem=async (req,res,next) => {

  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter((item) => item.product.toString() != productId);

    await user.save();
  } catch (error) {
    next(error);
  }
  
}