const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true
  },

  verificationCode: String,
  verificationCodeExpiry: Date,

  isVerified: {
    type: Boolean,
    default: false
  },

  resendCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  lastResendAt: Date,

  contact: {
    type: String,
    required: true
  },

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],

  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],

  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],

  profilePic: {
    type: String,
    default: "/avatar.png"
  }
},
  { timestamps: true }
);



const userModel = mongoose.model('User', userSchema)


module.exports = userModel