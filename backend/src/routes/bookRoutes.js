const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBook,
  createBook,
  loadBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");

const {
  protect,
  authorizeRoles,
  ownerOrAdmin,
} = require("../middleware/authMiddleware.js");

router.route("/").get(getBooks);


router.route("/").post(protect, authorizeRoles("owner", "admin"), createBook);

router
  .route("/:id")
  .get(getBook)
  .put(protect, loadBook, ownerOrAdmin, updateBook)
  .delete(protect, loadBook, ownerOrAdmin, deleteBook);

module.exports = router;
