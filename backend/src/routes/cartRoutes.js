const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.book"
  );
  res.json(cart || { user: req.user._id, items: [] });
});

router.post("/", protect, async (req, res) => {
  const { bookId, title, price, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.book.toString() === bookId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    if (existingItem.quantity <= 0) {
      cart.items = cart.items.filter((item) => item.book.toString() !== bookId);
    }
  } else if (quantity > 0) {
    cart.items.push({ book: bookId, title, price, quantity });
  }

  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
    "items.book"
  );
  res.json(updatedCart);
});

router.delete("/:bookId", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.book.toString() !== req.params.bookId
  );
  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
    "items.book"
  );
  res.json(updatedCart);
});

router.delete("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = [];
  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
    "items.book"
  );
  res.json(updatedCart);

});

router.delete("/clear", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] } 
    );
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
