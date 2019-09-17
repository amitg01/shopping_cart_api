var jwt = require("jsonwebtoken");
var User = require("../models/User");

exports.verifyAdmin = (req, res, next) => {
  const token =
    req.headers["Authorization"] || req.headers["authorization"] || null;

  if (!token) return res.json({ msg: "unAuthorized user" });
  const bearerToken = token.split(" ");
  const headerBearer = bearerToken[1];

  jwt.verify(headerBearer, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, msg: "invalid token" });
    User.findById({ _id: decoded._id }, (err, user) => {
      if (err) return res.status(404).json("user not found");
      console.log("cp in verifyAdmin");
      if (!user.isAdmin && !user.isStoreAdmin) {
        return res.status(401).json({ msg: "you are not authorized" });
      }
      next();
    });
  });
};
