import express from "express";
import { Request, Response, NextFunction } from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import router from "./routes/user.routes";
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const DB_HOST = process.env.DB_HOST ;
const API_VERSION = process.env.API_VERSION;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔥 Swagger UI dynamic
app.use('/api-docs', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
  const specs = swaggerJsdoc(swaggerOptions);
  swaggerUi.setup(specs)(req, res, next);
});


// Routes
app.use(API_VERSION + "/users", router);

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
  console.log(`Server running at: http://${HOST}:${PORT}`);
  console.log(`Swagger UI: http://${DB_HOST}:${PORT}/api-docs`);
});