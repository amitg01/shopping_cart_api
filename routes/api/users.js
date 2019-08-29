var express = require("express");
var router = express.Router();
var auth = require("../../utils/verifyToken");

var User = require("../../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// user registration
router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    console.log("cp1");
    jwt.sign({ userId: user.id }, process.env.SECRET, (err, token) => {
      if (err) return res.json({ success: false });
      return res.status(200).json({
        sucess: true,
        message: "you are successfully registered"
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

//middleware to verify token

router.use(auth.verifyToken);

//  GET users listing.
router.get("/", function(req, res, next) {
  User.find((err, users) => {
    if (err) res.json({ success: false, err });
    res.status(200).json({ success: true, users });
  });
});

//get single user

router.get("/:id", (req, res) => {
  var id = req.params.id;
  // console.log(id);
  User.findById({ _id: id }, (err, user) => {
    console.log("cp in singleUser");
    if (err) return res.status(404).json("user not found");
    res.status(200).json({ success: true, user });
  });
});

// update an user

router.put("/update/:id", (req, res) => {
  console.log("cp2");
  var id = req.params.id;

  User.findByIdAndUpdate(
    id,
    req.body,
    { upsert: true, new: true },
    (err, user) => {
      if (err)
        return res.json({ success: false, msg: "could not update user", err });
      res.status(200).json({ success: true, msg: "user updated", user });
    }
  );
});

// block a user

router.put("/block/:id", (req, res) => {
  var id = req.params.id
  User.findByIdAndUpdate(
    id,
    {isBlocked:true},
    { upsert: true, new: true },
    (err, user) => {
      if (err)
        return res.json({ success: false, msg: "could not block user", err });
      res.status(200).json({ success: true, msg: "user blocked", user });
    }
  );

});

// delete an user

router.delete("/:id", (req, res) => {
  var id = req.params.id;

  User.findOneAndDelete(id, (err, user) => {
    if (err) return res.json({ success: false, msg: "error deleting user" });
    res.status(200).json({ success: true, msg: "user deleted", user });
  });
});

module.exports = router;
