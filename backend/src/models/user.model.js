const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  fullname: {
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

  contact: {
    type: String,
  },
  address : {
    type : Array,
    default : []
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
    default: ""
  }
},
  { timestamps: true }
);



const userModel = mongoose.model('User', userSchema)


module.exports = userModel