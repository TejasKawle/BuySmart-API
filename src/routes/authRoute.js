import express from "express"
import { changePassword, getMyProfile, loginUser, registerUser, updateProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getMyProfile);
router.route('/update-profile').put(protect, updateProfile);
router.route('/change-password').put(protect, changePassword);

export default router;