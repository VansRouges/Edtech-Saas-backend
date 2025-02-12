import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MenuJollof Appwrite-Express API',
      version: '1.0.0',
      description: 'API documentation for the MenuJollof Appwrite-Express API',
    },
  },
  // Paths to files with API documentation
  apis: ['./routes/*.ts'], // Adjust this path based on your project structure
};

export const swaggerSpec = swaggerJsDoc(options);
