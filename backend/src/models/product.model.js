const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    images: {
      type: [String],
      required: true
    },

    category: {
      type: String,
      enum: ["men", "women", "leather-bag"],
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    colors: [String],

    sizes: [String],

    fabric: String,

    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String
    }],

    uiTheme: {
      bgColor: String,
      panelColor: String,
      textColor: String
    }
  },
  { timestamps: true }
);


const productModel = mongoose.model('Product', productSchema)