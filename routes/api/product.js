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

// update a product

router.put("/update/:id", (req, res) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(
    id,
    req.body,
    { upsert: true, new: true },
    (err, product) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, msg: "failed to update product" });
      return res
        .status(200)
        .json({ success: true, msg: "product updated", product });
    }
  );
});

// get all products

router.get("/", (req, res) => {
  Product.find((err, products) => {
    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).json({ success: true, products });
  });
});

// get a single product

router.get("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err)
      return res
        .status(404)
        .json({ success: true, msg: "product not found", err });
    return res.status(200).json({ success: true, product });
  });
});

// delete an item

router.delete("/delete/:id", (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, msg: "failed to delete product", err });
    return res.status(200).json({ success: true, msg: "product deleted" });
  });
});



module.exports = router;
