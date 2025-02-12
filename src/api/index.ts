import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // CORS middleware
import authRoutes from './authRoutes';  // Import auth routes
import restaurantRoutes from './restaurantRoutes';  // Import restaurant routes
import menuRoutes from './menuRoutes';
import categoryRoutes from './categoryRoutes';
import menuImageRoutes from './menuImageRoutes';
import restaurantImageRoutes from './restaurantImageRoutes';
import dashboardRoutes from "./dashboardRoutes";
import { errorHandler } from '../utils/errorHandler';  // Custom error handler middleware
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../docs/swagger.json';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());  // Handle CORS
app.use(express.json());  /// Parse incoming JSON requests

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec);

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/restaurants', restaurantRoutes);  // Restaurant routes
app.use('/api/menus', menuRoutes);  // Use menu routes
app.use('/api/categories', categoryRoutes);  // Use category routes
app.use('/api/restaurant-images', restaurantImageRoutes);  // Use restaurant image routes
app.use('/api/menu-images', menuImageRoutes);  // Use menu image routes
app.use("/api/dashboard", dashboardRoutes); // Use dashboard routes

// Global Error Handling Middleware
app.use(errorHandler);  // Handle errors globally

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Appwrite Express API');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;