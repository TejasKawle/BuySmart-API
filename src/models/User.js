import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const cartItemSchema = new mongoose.Schema({
  
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default:1
  }
},{_id:false})


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Name is required'],
    trim:true
  },
  email: {
    type: String,
    required: [true,'email is required'],
    unique: true,
    lowercase: true,
    trim:true
  },
  password: {
    type: String,
    required:[true,'password is required']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default:'user'
  },
  cart:[cartItemSchema]
}, { timestamps: true })


userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.matchPassword=async function (enteredPassword) {

  return await bcrypt.compare(this.password, enteredPassword);
  
}

const User = mongoose.model("User", userSchema);
export default User;