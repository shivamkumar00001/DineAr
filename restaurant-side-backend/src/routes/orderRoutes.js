const express = require("express");
const router = express.Router();

const {
  createOrder,
  getRestaurantOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/orders", createOrder);
router.get("/restaurants/:restaurantId/orders", getRestaurantOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

module.exports = router;
