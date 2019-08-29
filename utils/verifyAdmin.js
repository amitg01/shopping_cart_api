var jwt = require("jwt");
var User = require("../models/User");

exports.verifyAdmin = (req, res, next) => {
  const token =
    req.headers["Authorization"] || req.headers["authorization"] || null;

  if (!token) return res.json({ msg: "unAuthorized user" });
  const bearerToken = token.split("");
  const headerBearer = bearerToken[1];

  jwt.verify(headerBearer, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, msg: "invalid token" });

    if (!decoded.isAdmin)
      return res
        .status(401)
        .json({ success: false, msg: "you cannot access this page" });

    next();
  });
};
