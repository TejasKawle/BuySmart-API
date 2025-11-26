import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import { connectDB } from "./src/config/db.js";
import authRoute from "./src/routes/authRoute.js";
import productRoute from "./src/routes/productRoute.js"
import cartRoute from "./src/routes/cartRoute.js"
import orderRoute from "./src/routes/orderRoute.js"
import adminRoute from "./src/routes/adminRoute.js"
const app = express();

app.use(express.json());

connectDB();

// user route
app.use("/api/v1/auth", authRoute);

// product route
app.use('/api/v1/product', productRoute);

// cart route
app.use('/api/v1/cart', cartRoute);

// order route
app.use('/api/v1/order', orderRoute);

// admin route
app.use('/api/v1/admin', adminRoute);

// centralised error handler
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
