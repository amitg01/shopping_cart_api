var express = require("express");
var router = express.Router();

var tokenAuth = require("../../utils/verifyToken");

var Cart = require("../../models/Cart");
var User = require("../../models/User");
var Item = require("../../models/Item");

router.use(tokenAuth.verifyToken);

// add item to cart

router.put("/add/:id", (req, res) => {
  // use userId to find the users cart
  var { userId } = req.body; // userId is sent from the client
  User.findById(userId, (err, user) => {
    if (err) return res.status(400).json({ err });
    Item.create({ productId: req.params.id }, (err, item) => {
      if (err) return res.status(400).json({ err });
      Cart.findByIdAndUpdate(
        user.cartId,
        { $push: { items: item.id } },
        { new: true, upsert: true },
        (err, cart) => {
          if (err)
            return res
              .status(400)
              .json({ success: false, msg: "failed to add product to cart" });
          return res
            .status(200)
            .json({ success: true, msg: "item added succesfully", cart });
        }
      );
    });
  });
});

// remove item from cart

router.delete("/remove/:itemId", (req, res) => {
  // use userId to find the users cart
  var { userId } = req.body; // userId is sent from the client
  User.findById(userId, (err, user) => {
    if (err) return res.status(400).json({ err });
      Cart.findByIdAndUpdate(
        user.cartId,
        { $pull: { items: req.params.itemId } },
        { new: true, upsert: true },
        (err, cart) => {
          if (err)
            return res
              .status(400)
              .json({ success: false, msg: "failed to remove product from cart" });
          return res
            .status(200)
            .json({ success: true, msg: "item remove succesfully", cart });
        }
      );

  });
});

module.exports = router;
