const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const {
  
  toggleAvailability,
  updateStatus,getDish,
  getDishStats,updateDish
} = require('../controllers/dishController');



// GET single dish
router.get("/dishes/:id", getDish);


//toggle
router.patch('/dishes/:id/availability', toggleAvailability);

// Update dish
router.put(
  '/restaurants/:restaurantId/dish/:id',
  upload.single('image'),
  updateDish
);

module.exports = router;
