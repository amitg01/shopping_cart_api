var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var productRouter = require("./product");
var cartRouter = require("./cart");
var storeRouter = require("./store");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/store", storeRouter);

module.exports = router;
