const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  markAsPaid,
  markAsDelivered,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);  
router.get("/", protect, getOrders);    
router.get("/:id", protect, getOrderById);   

router.get("/admin/all", protect, admin, getAllOrders); 
router.put("/:id/pay", protect, admin, markAsPaid);   
router.put("/:id/deliver", protect, admin, markAsDelivered); 

module.exports = router;

