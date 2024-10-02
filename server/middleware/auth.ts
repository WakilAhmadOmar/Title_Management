const jwt = require("jsonwebtoken");

module.exports = function (req: any, res: any, next: any) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token?.split(" ")?.[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
