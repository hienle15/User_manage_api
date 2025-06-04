import { Request, Response, NextFunction } from 'express';

const isValidName = (name: any): string | null => {
  if (typeof name !== 'string') return "Name must be a string";
  if (name !== name.trim()) return "Name must not have leading or trailing whitespace";
  if (name.trim().length === 0) return "Name cannot be empty";
  return null;
};

const isValidAge = (age: any): string | null => {
  if (typeof age !== 'number') return "Age must be a number";
  if (age <= 0) return "Age must be greater than 0";
  return null;
};

export const validateHandler = {
  create: (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      res.status(400).json({ status: 400, message: "Missing required fields" });
      return;
    }

    const nameError = isValidName(name);
    if (nameError) {
      res.status(400).json({ status: 400, message: nameError });
      return;
    }

    const ageError = isValidAge(age);
    if (ageError) {
      res.status(400).json({ status: 400, message: ageError });
      return;
    }

    req.body.name = name.trim();
    next();
  },

  update: (req: Request, res: Response, next: NextFunction): void => {
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ status: 400, message: "No fields to update" });
      return;
    }

    if (updateData.name !== undefined) {
      const nameError = isValidName(updateData.name);
      if (nameError) {
        res.status(400).json({ status: 400, message: nameError });
        return;
      }
      updateData.name = updateData.name.trim();
    }

    if (updateData.age !== undefined) {
      const ageError = isValidAge(updateData.age);
      if (ageError) {
        res.status(400).json({ status: 400, message: ageError });
        return;
      }
    }

    next();
  }
};
