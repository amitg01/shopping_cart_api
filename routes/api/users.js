var express = require("express");
var router = express.Router();

var User = require("../../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find((err, users) => {
    if (err) res.json({ success: false, err });
    res.status(200).json({ success: true, users });
  });
});

// user registration

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    jwt.sign({ userId: user.id }, process.env.SECRET, (err, token) => {
      if (err) return res.json({ success: false });
      return res.status(200).json({
        sucess: true,
        message: "you are successfully registered",
        token
      });
    });
  });
});

// user login

router.post("/login", (req, res, next) => {
  var data = req.body;
  User.findOne({ email: data.email }, (err, user) => {
    if (err)
      return res.status(500).json({ sucess: false, msg: "server error" });
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: "enter a valid email" });
    var result = bcrypt.compareSync(data.password, user.password);
    if (result) {
      console.log(user, "user in login");
      var token = jwt.sign({ _id: user._id }, process.env.SECRET);
      return res.status(200).json({ success: true, token, user });
    } else {
      return res.status(400).json({ success: false, msg: "invalid password" });
    }
  });
});

module.exports = router;
