import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    // Handle 404 errors
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

// Add route not found handler
export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        status: 404,
        message: "Route not found"
    });
};