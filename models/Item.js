var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref:'Product' },
  quantity: {
    type: Number,
    min: 0,
    defualt:0
  }
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item;
