var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

var userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart"
    },

    storeId: { type: Schema.Types.ObjectId, ref: "Store" },
    isStoreAdmin: Boolean
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  if (this.email === process.env.EMAIL) {
    this.isAdmin = true;
  }
  next();
});

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) return cb(err);
    cb(null, result);
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
