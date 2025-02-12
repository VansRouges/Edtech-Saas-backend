# **MenuJollof Backend API – README**  

Welcome to the **MenuJollof Backend API**! This API powers the backend of MenuJollof, an application designed to manage restaurants, menus, and categories efficiently, using **Appwrite** for backend-as-a-service functionalities and **Express.js** for handling API endpoints. This project provides a complete CRUD system for restaurants, menus, and categories, with Swagger UI for API documentation.

---

## **Table of Contents**
1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation](#installation)  
4. [Environment Variables](#environment-variables)  
5. [API Endpoints](#api-endpoints)  
6. [Usage](#usage)  
7. [Error Handling](#error-handling)  
8. [Swagger Documentation](#swagger-documentation)  
9. [Contribution](#contribution)  
10. [License](#license)

---

## **Features**
- **User Authentication**: Login and session management using Appwrite SDK.
- **Restaurant Management**: Create and fetch restaurants associated with users.
- **Menu Management**: Create and fetch menus linked to specific restaurants.
- **Category Management**: Create and fetch categories under restaurants.
- **Image Uploads**: Upload menu images using Appwrite's Storage service.
- **Swagger Documentation**: Automatically generated API documentation for easy testing and exploration.

---

## **Technologies Used**
- **Node.js** – Runtime for JavaScript on the server.  
- **Express.js** – Web framework for building RESTful APIs.  
- **Appwrite SDK** – Backend-as-a-Service for authentication, storage, and database management.  
- **Swagger UI** – Interactive API documentation tool.  
- **TypeScript** – Static typing for enhanced development experience (optional).  
- **dotenv** – For managing environment variables.  

---

## **Installation**
Follow these steps to run the MenuJollof Backend API locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/MenuJollof-Backend.git
   cd MenuJollof-Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

4. **Run the server**:
   ```bash
   npm run dev
   ```

5. **Access Swagger Documentation**:  
   Open your browser and navigate to `http://localhost:8080/api-docs` to explore the API.

---

## **Environment Variables**
Create a `.env` file in the project’s root directory and add the following values:

```plaintext
APPWRITE_ENDPOINT=http://localhost/v1
APPWRITE_PROJECT_ID=<your-project-id>
APPWRITE_API_KEY=<your-api-key>
MENU_BUCKET_ID=<your-menu-bucket-id>
JWT_SECRET=<your-secret-key>
PORT=8080
```

---

## **API Endpoints**

Below is an overview of the available API endpoints:

### **Authentication**
- **POST /api/auth/login**: Logs in a user and creates a session.  

### **Restaurants**
- **POST /api/restaurants/create**: Create a new restaurant.  
- **GET /api/restaurants/:userId**: Fetch restaurants associated with a specific user.  

### **Menus**
- **POST /api/menus/create**: Create a new menu item with an uploaded image.  
- **GET /api/menus/:restaurantId**: Fetch all menus under a specific restaurant.  

### **Categories**
- **POST /api/categories/create**: Create a new category.  
- **GET /api/categories/:restaurantId**: Fetch categories belonging to a specific restaurant.  

---

## **Usage**

### **Authentication – Login Example**

**Request**:  
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "session": {
    "$id": "unique-session-id",
    "userId": "unique-user-id"
  }
}
```

### **Create a Restaurant**

**Request**:  
```http
POST /api/restaurants/create
Content-Type: application/json

{
  "name": "Jollof Palace",
  "location": "Lagos, Nigeria",
  "description": "Serving the finest Jollof rice in town."
}
```

**Response**:
```json
{
  "success": true,
  "restaurant": {
    "$id": "restaurant-id",
    "name": "Jollof Palace",
    "location": "Lagos, Nigeria"
  }
}
```

---

## **Error Handling**
The API responds with appropriate HTTP status codes and error messages. Some common errors include:

- **400 Bad Request**: Invalid input parameters.
- **401 Unauthorized**: Authentication failure.
- **404 Not Found**: Resource does not exist.
- **500 Internal Server Error**: Server-side error.

Example error response:
```json
{
  "success": false,
  "message": "Invalid user credentials"
}
```

---

## **Swagger Documentation**
Swagger is integrated for easy exploration and testing of the API. After starting the server, navigate to:

```
http://localhost:8080/api-docs
```

Swagger UI will display the available endpoints with details about their parameters, request bodies, and response structures.

---

## **Contribution**
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch with your feature/bug fix.
3. Commit and push your changes.
4. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for more details.
