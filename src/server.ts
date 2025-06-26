import express from "express";
import { Request, Response, NextFunction } from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import router from "./routes/user.routes";
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
import projectRoutes from "./routes/project.routes";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost';
const API_VERSION = process.env.API_VERSION;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔥 Swagger UI dynamic
app.use('/api-docs', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
  const specs = swaggerJsdoc(swaggerOptions);
  swaggerUi.setup(specs)(req, res, next);
});
app.use('/projects', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
  const specs = swaggerJsdoc(swaggerOptions);
  swaggerUi.setup(specs)(req, res, next);
});

// Routes
app.use(API_VERSION + "/users", router);
app.use(API_VERSION + "/projects", projectRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found"
  });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
 
  console.log(`Swagger UI: http://${HOST}:${PORT}/api-docs`);
console.log(`Projects: http://${HOST}:${PORT}/projects`);
console.log(`Users: http://${HOST}:${PORT}/users`);
});