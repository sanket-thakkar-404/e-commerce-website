const mongoose = require('mongoose')



const ownerSchema = new mongoose.Schema({
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
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  password: {
    type: String,
    required: true
  },

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