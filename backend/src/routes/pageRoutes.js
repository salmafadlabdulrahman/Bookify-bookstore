const express = require("express");
const {
  protect,
  admin,
  owner,
  ownerOrAdmin,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ message: "Welcome to the Home Page!" });
});

router.get("/shop", protect, (req, res) => {
  res.json({ message: "Welcome to the Shop!", user: req.user });
});

router.get("/about", protect, (req, res) => {
  res.json({ message: "About Us page visible only to logged-in users" });
});

router.get("/dashboard", protect, ownerOrAdmin, (req, res) => {
  res.json({
    message: "Dashboard accessible by Admin & Owner only",
    user: req.user,
  });
});

module.exports = router;
