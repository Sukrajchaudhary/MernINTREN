const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    default: 1,
  },

  thumbnail: {
    type: String,
    required: true,
  },
});

exports.Blog = mongoose.model("Blog", productSchema);
