const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');

const Dish = require('../models/Dish');   // <-- required for categories

const {
  getMenu,
  createDish,
  
  deleteDish
} = require('../controllers/menu.controller');


// GET all categories
router.get('/restaurants/:restaurantId/categories', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const categories = await Dish.distinct("category", { restaurantId });

    return res.json({
      success: true,
      data: categories,
    });
  } catch (err) {
    console.error("Category fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching categories"
    });
  }
});


// GET full menu
router.get('/restaurants/:restaurantId/menu', getMenu);

// CREATE dish
router.post(
  '/restaurants/:restaurantId/menu',
  upload.single('image'),
  createDish
);



// DELETE dish
router.delete('/restaurants/:restaurantId/menu/:id', deleteDish);

//
const { getDish } = require('../controllers/dishController');

router.get(
  "/restaurants/:restaurantId/menu/:id",
  getDish
);


module.exports = router;
