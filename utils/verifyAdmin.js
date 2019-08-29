var jwt = require("jsonwebtoken");
var User = require("../models/User");

exports.verifyAdmin = (req, res, next) => {
  const token =
    req.headers["Authorization"] || req.headers["authorization"] || null;

  if (!token) return res.json({ msg: "unAuthorized user" });
  const bearerToken = token.split(" ");
  const headerBearer = bearerToken[1];
  console.log("cp in admin middleware");
  console.log(headerBearer, "in admin middleware");

  jwt.verify(headerBearer, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, msg: "invalid token" });
    console.log(decoded, "in user middleware");
    User.findById({ _id: decoded._id }, (err, user) => {
      console.log("cp in singleUser");
      if (err) return res.status(404).json("user not found");

      // if (!decoded.isAdmin)
      //   return res
      //     .status(401)
      //     .json({ success: false, msg: "you cannot access this page" });
      if (!user.isAdmin)
        return res.status(401).json({ msg: "you are not authorized" });
      next();
    });
  });
};
