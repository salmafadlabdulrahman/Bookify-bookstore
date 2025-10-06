const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.route("/").get(protect, authorizeRoles("admin", "owner"), getUsers);
router
  .route("/:id")
  .get(protect, authorizeRoles("admin"), getUserById)
  .put(protect, authorizeRoles("admin"), updateUser)
  .delete(protect, authorizeRoles("admin"), deleteUser);


module.exports = router;
