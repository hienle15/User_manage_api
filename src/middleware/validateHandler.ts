import { Request, Response, NextFunction } from 'express';
import { isValidName, isValidAge, isValidEmail } from './validators';

const allowedFields = ['name', 'email', 'age'];

export const validateHandler = {
  create: (req: Request, res: Response, next: NextFunction): void => {
    const requestFields = Object.keys(req.body);
    const unexpectedFields = requestFields.filter(field => !allowedFields.includes(field));

    if (unexpectedFields.length > 0) {
      res.status(400).json({
        status: 400,
        message: `Invalid format. Disallowed fields: ${unexpectedFields.join(', ')}`,
        allowedFields: allowedFields
      });
      return;
    }

    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      res.status(400).json({
        status: 400,
        message: "Missing required fields"
      });
      return;
    }

    const nameError = isValidName(name);
    if (nameError) {
      res.status(400).json({ status: 400, message: nameError });
      return;
    }

    const emailError = isValidEmail(email);
    if (emailError) {
      res.status(400).json({ status: 400, message: emailError });
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
    const requestFields = Object.keys(req.body);
    const unexpectedFields = requestFields.filter(field => !allowedFields.includes(field));

    if (unexpectedFields.length > 0) {
      res.status(400).json({
        status: 400,
        message: `Invalid format. Disallowed fields: ${unexpectedFields.join(', ')}`,
        allowedFields: allowedFields
      });
      return;
    }

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

    if (updateData.email !== undefined) {
      const emailError = isValidEmail(updateData.email);
      if (emailError) {
        res.status(400).json({ status: 400, message: emailError });
        return;
      }
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
