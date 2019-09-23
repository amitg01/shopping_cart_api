var express = require("express");
var router = express.Router();

var tokenAuth = require("../../utils/verifyToken");
var Store = require("../../models/Store");
var User = require("../../models/User");

router.use(tokenAuth.verifyToken);

// create store

router.post("/create", (req, res) => {
  var { creatorId } = req.body;
  Store.create({ creatorId }, (err, store) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, msg: "failed to create store", err });
    User.findByIdAndUpdate(
      creatorId,
      { storeId: store._id, isStoreAdmin: true },
      { new: true, upsert: true },
      (err, user) => {
        if (err)
          return res.status(400).json({ sucess: false, msg: "server error" });
        return res
          .status(200)
          .json({ sucess: true, msg: "store created", store });
      }
    );
  });
});

module.exports = router;
