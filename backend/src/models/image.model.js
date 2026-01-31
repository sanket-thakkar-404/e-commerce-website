const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true, // ImageKit CDN URL
    },

    fileId: {
      type: String,
      required: true, // ImageKit fileId (delete/update ke kaam aata hai)
    },

    folder: {
      type: String,
      default: "products", // ImageKit folder
    },

    usedIn: {
      type: String,
      enum: ["product", "banner", "category"],
      default: "product",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Image", imageSchema);