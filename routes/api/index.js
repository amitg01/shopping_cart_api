var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var productRouter = require("./product");
var cartRouter = require("./cart");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
