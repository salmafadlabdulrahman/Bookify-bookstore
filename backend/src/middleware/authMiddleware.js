const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden: insufficient role");
    }
    next();
  };
};

const ownerOrAdmin = async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (req.user.role === "admin") return next();
  if (
    req.book &&
    req.book.owner &&
    req.book.owner.toString() === req.user._id.toString()
  ) {
    return next();
  }
  res.status(403);
  throw new Error("Forbidden: not owner nor admin");
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};


const owner = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    return next();
  }
  res.status(403).json({ message: "Owner access only" });
};

module.exports = { protect, authorizeRoles, ownerOrAdmin, admin, owner };
