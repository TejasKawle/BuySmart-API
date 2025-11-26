import express from "express"
import { createProduct, deleteProduct, getProductById, getproducts, updateProduct } from "../controllers/productController.js";
import { protect,adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(getproducts);
router.route('/').post(protect, adminOnly, createProduct); // admin route
router.route('/:id').get(getProductById);
router.route("/:id").put(protect,adminOnly,updateProduct); // admin route
router.route("/:id").delete(protect,adminOnly,deleteProduct); //admin route

export default router;