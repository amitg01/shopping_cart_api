var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var productRouter = require("./product");

router.use("/users", userRouter);
router.use("/products",productRouter);

module.exports = router;
