// config/swagger.ts
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
        url: 'http://10.10.23.106:3000/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
