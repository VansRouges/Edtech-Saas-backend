import express from 'express';
import { 
  createCategory, 
  fetchCategoriesByRestaurantId, 
  deleteCategoryController, 
  editCategoryController 
} from '../controllers/categoryController';

const router = express.Router();

// Route to create a category
router.post('/create', createCategory);

// Route to fetch categories by restaurantId
router.get('/:restaurantId', (req, res, next) => {
    fetchCategoriesByRestaurantId(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});

// PUT endpoint to edit a category
router.put('/:categoryId', (req, res, next) => {
  editCategoryController(req, res).then(() => {
    next();
  }).catch((err) => {
    next(err);
  });
});

// DELETE endpoint to delete a category
router.delete('/:categoryId', (req, res, next) => {
  deleteCategoryController(req, res).then(() => {
    next();
  }).catch((err) => {
    next(err);
  });
});

export default router;
