import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    trim:true
  },
  description: {
    type: String,
    default:''
  },
  price: {
    type: Number,
    required: true,
    min:0
  },
  stock: {
    type: Number,
    required: true,
    min:0
  },
  category: {
    type: String,
    dafault:'general'
  },
  image:[{type:String}]


},{timestamps:true})

// index for queries
productSchema.index({ name: 'text', category: 1 })

const Product = mongoose.model('Product', productSchema);
export default Product;