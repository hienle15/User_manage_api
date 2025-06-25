import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// General error-handling middleware
export const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    // Handle 404 - User not found
    if (err.status === 404) {
        res.status(404).json({
            status: 404,
            message: "User not found"
        });
        return;
    }

    // Handle other errors
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Internal server error"
    });
};

// Middleware to handle unmatched routes
export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        status: 404,
        message: "Route not found"
    });
};
