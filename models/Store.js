var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User"
  }
});

var Store = mongoose.model("Store", storeSchema);
module.exports = Store;
