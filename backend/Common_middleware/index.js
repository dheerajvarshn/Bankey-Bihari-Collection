const { JWT_PRIVATE_KEY } = require("../config/key");

const { secret } = JWT_PRIVATE_KEY;
const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, secret);
    console.log(user);
    req.user = user;
    return next();
  }
  return res.status(400).send({ message: "Authorization Required" });
};

exports.userMiddleware = (req, res, next) => {};
