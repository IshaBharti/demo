const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    product: {
      type: String,
    },

    userId: { type: Schema.Types.ObjectId, ref: "User" }
  },
);

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
