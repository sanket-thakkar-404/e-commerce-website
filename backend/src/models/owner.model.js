const mongoose = require('mongoose')



const ownerSchema = new mongoose.Schema({
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
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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

  lastResendAt: Date,

  contact: {
    type: String,
    required: true
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],

  profilePic: {
    type: String,
    default: ""
  }
},
  { timestamps: true }
);



const ownerModel = mongoose.model('Owner', ownerSchema)


module.exports = ownerModel