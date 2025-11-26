import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { getOrderStats, getRevenueStats, getTotalCount } from "../controllers/adminStatsController.js";

const router = express.Router();

router.route('/total-order').get(protect, adminOnly, getTotalCount);

router.route('/get-order-stat').get(protect, adminOnly, getOrderStats);

router.route('/get-revenue').get(protect, adminOnly, getRevenueStats);

export default router;