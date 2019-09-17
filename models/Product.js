var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["electronics", "garments", "food", "toys", "groceries"],
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  }
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
