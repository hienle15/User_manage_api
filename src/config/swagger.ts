import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

const swaggerOptions = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'Simple CRUD API for managing users',
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}${API_VERSION}`,
        description: 'Development server',

      },
       {
        url: `https://usermanageapi-production-d23e.up.railway.app/`,
        description: 'prodcution server',
        
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;