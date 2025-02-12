// src/routes/menuRoutes.ts
import express from 'express';
import { createMenu, fetchMenusByRestaurantId, deleteMenu } from '../controllers/menuController';

const router = express.Router();

// Route to create a new menu
router.post('/create', createMenu);

// Route to fetch menus by restaurantId
router.get('/:restaurantId', (req, res, next) => {
    fetchMenusByRestaurantId(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});

// Delete Menu Route
router.delete('/:menuId', (req, res, next) => { // DELETE /api/menus/:menuId
  deleteMenu(req, res).then(() => {
    next();
  }).catch((err) => {
    next(err);
  });
});

export default router;