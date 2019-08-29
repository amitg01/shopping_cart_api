var jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token =
    req.headers["Authorization"] || req.headers["authorization"] || null;

  if (!token) return res.json({ msg: "unAuthorized user" });
  const bearerToken = token.split("");
  const headerBearer = bearerToken[1];

  jwt.verify(headerBearer, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, msg: "invalid token" });
    req.user = decoded;
    next(); 
  });
};
