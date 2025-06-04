import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const findAll = async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.status(200).json({
        status: 200,
        message: "Users retrieved successfully",
        data: users
    });
};

export const findOne = async (req: Request, res: Response) => {
    const user = await userService.findOne(Number(req.params.id));
    if (!user) {
        throw { status: 404, message: "User not found" };
    }
    
    res.status(200).json({
        status: 200,
        message: "User retrieved successfully",
        data: user
    });
};

export const create = async (req: Request, res: Response) => {
    const result = await userService.create(req.body) as { insertId: number };
    const newUser = await userService.findOne(result.insertId);
    
    res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser
    });
};

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.findOne(id);
    
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    await userService.update(id, req.body);
    const updatedUser = await userService.findOne(id);
    
    res.status(200).json({
        status: 200,
        message: "User updated successfully",
        data: updatedUser
    });
};

export const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    // Check if user exists
    const existingUser = await userService.findOne(id);
    if (!existingUser) {
        // throw { status: 404, message: "User not found" };
        return res.status(404).json({ message: "User not found" });
       
    }

    await userService.remove(id);
    res.status(200).json({
        status: 200,
        message: "User deleted successfully"
    });
};