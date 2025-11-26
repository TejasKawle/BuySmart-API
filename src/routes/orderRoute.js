import express from "express"
import { getAllorders, getMyOrder, getSingleOrder, placeOrder, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.route('/').post(protect, placeOrder);
router.route('/my').get(protect, getMyOrder);
router.route('/:id').get(protect, getSingleOrder);
router.route('/:id/status').post(protect,adminOnly,updateOrderStatus);
router.route('/all').get(protect, adminOnly, getAllorders);


export default router;