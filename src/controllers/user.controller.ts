import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { isValidUserFields } from "../middleware/validators";
// Get a list of all users
export const findAll = async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.status(200).json({
        status: 200,
        message: "User list retrieved successfully",
        data: users
    });
};

// Get a single user by ID
export const findOne = async (req: Request, res: Response) => {
    const user = await userService.findOne(Number(req.params.id));
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    res.status(200).json({
        status: 200,
        message: "User information retrieved successfully",
        data: user
    });
};

// Create a new user
export const create = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const whitespaceError = isValidUserFields(name, email);
    if (whitespaceError) {
        return res.status(400).json({
            status: 400,
            message: whitespaceError
        });
    }
    const result = await userService.create(req.body) as { insertId: number };
    const newUser = await userService.findOne(result.insertId);
    res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser
    });
};

// Update user information
export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.findOne(id);

    if (!user) {
        throw { status: 404, message: "User not found" };
    }
    const { name, email } = req.body;
    const whitespaceError = isValidUserFields(name, email);
    if (whitespaceError) {
        return res.status(400).json({
            status: 400,
            message: whitespaceError
        });
    }
    await userService.update(id, req.body);
    const updatedUser = await userService.findOne(id);

    res.status(200).json({
        status: 200,
        message: "User updated successfully",
        data: updatedUser
    });
};

// Delete a user
export const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    // Check if user exists
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    await userService.remove(id);
    res.status(200).json({
        status: 200,
        message: "User deleted successfully"
    });
};