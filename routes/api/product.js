var express = require("express");
var router = express.Router();

var adminAuth = require("../../utils/verifyAdmin");

var Product = require("../../models/Product");

// admin auth

router.use(adminAuth.verifyAdmin);

// add products

router.post("/", (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ success: false, msg: "failed to add product", err });
    return res
      .status(200)
      .json({ success: true, msg: "product added", product });
  });
});

router.put("/:id", (req, res) => {
  var id = req.params.id;
  Product.findByIdAndUpdate({ _id: id }, (err, product) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, msg: "failed to update product" });
        return res.status(200).json({success:true,msg:"product updated"})
  });
});

// get all products

router.get("/", (req, res) => {
  Product.find((err, products) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, products });
  });
});

module.exports = router;
