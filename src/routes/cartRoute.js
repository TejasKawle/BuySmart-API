import express from "express"
import { addToCart, getCart, removeCartItem, updateCartQuantity } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/add/:productId').post(protect, addToCart);
router.route('/').get(protect, getCart);
router.route('/update/:productId').put(protect, updateCartQuantity);
router.route('/remove/:productId').delete(protect, removeCartItem);

export default router;