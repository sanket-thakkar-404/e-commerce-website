const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderId: {
    type: String,
    unique: true,
    index: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      name: String,          // snapshot
      image: String,         // snapshot
      price: Number,         // snapshot
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  discountAmount: {
    type: Number,
    default: 0
  },

  finalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ["cod", "card", "upi"],
    default: "cod"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "confirmed"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
    default: "placed"
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String
  }
},
  { timestamps: true }
);



const orderModel = mongoose.model('Order', orderSchema)


module.exports = orderModel