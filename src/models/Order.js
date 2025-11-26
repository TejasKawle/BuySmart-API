import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [orderItemSchema],

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country:String
    },
    paymentMethod: {
      type: String,
      default:'cod'
    },
    itemPrice: {
      type: Number,
      required:true
    },
    taxPrice: {
      type: Number,
      default:0
    },
    shippingPrice: {
      type: Number,
      default:0
    },
    totalPrice: {
      type: Number,
      required:true
    },
    isPaid: {
      type: Boolean,
      default:false
    },
    paidAt: Date,
    
    status: {
      type: String,
      enum: ['created', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'created'
    },
  },
  
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
