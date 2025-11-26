import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// register user

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      jwtToken: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });

    const user = await User.findOne({ email });

    if (!user || !user.matchPassword(password)) {
      res
        .status(401)
        .json({ success: false, message: "invalid email or password" });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      success: true,
      message: "login successful",
      jwtToken: token,
    });
  } catch (error) {
    next(error);
  }
};

// get user profile

export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};

// update profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const updateUser = User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");
    res.json({
      success: true,
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

// update password
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.matchPassword(oldPassword)) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
