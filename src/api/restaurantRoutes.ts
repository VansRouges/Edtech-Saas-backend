// src/routes/restaurantRoutes.ts
import express from 'express';
import { createRestaurant, fetchRestaurantByUserId, validateSlug } from '../controllers/restaurantController';

const router = express.Router();

// Define restaurant-related endpoints
// Create a new restaurant
router.post('/create', createRestaurant); 

// Fetch a restaurant by user ID
router.get('/:userId', (req, res, next) => {
    fetchRestaurantByUserId(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});

router.post('/validate-slug', (req, res, next) => { // Validate slug uniqueness
  validateSlug(req, res).then(() => {
    next();
  }).catch((err) => {
    next(err);
  });
}); 

export default router; // Export the router instance
