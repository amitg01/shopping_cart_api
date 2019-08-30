var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
