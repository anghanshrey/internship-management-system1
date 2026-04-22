const jwt = require("jsonwebtoken");

exports.adminprotect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET1);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};