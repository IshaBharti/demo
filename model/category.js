const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  
  category: {
    type: String,
  },

  userId: { type: Schema.Types.ObjectId, ref: "Product" }
  },
  { collection: "Product" }


)

  


var category = mongoose.model("Category",categorySchema )

module.exports = category;