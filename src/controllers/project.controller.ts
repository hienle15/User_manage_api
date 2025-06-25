// project.controller.ts
import * as projectService from "../services/project.service";
import { Request, Response } from "express";
import { isValidProjectFields } from "../middleware/validators";

export const findAll = async (req: Request, res: Response) => {
  const data = await projectService.findAll();
  // Changed to include a message, even if it's a generic one
  res.status(200).json({
    status: 200,
    message: "Projects retrieved successfully",
    data,
  });
};

export const findOne = async (req: Request, res: Response) => {
  const user = await projectService.findOne(Number(req.params.id));
  if (!user) {
    // This throw will be caught by an error handling middleware if you have one
    // For direct response, you'd send res.status(404).json(...) here
    throw { status: 404, message: "Project not found" };
  }

  res.status(200).json({
    status: 200,
    message: "Project information retrieved successfully",
    data: user,
  });
};

export const create = async (req: Request, res: Response) => {
  try {
    let { name, description, user_ids } = req.body;

    // Validate whitespace
    const whitespaceError = isValidProjectFields(name, description);
    if (whitespaceError) {
      return res.status(400).json({
        status: 400,
        message: whitespaceError
      });
    }

    // Trim dữ liệu trước khi kiểm tra duplicate và lưu
    name = name.trim();
    description = description.trim();

    // Check for duplicates
    const isDuplicate = await projectService.isDuplicateProject({ name, description, user_ids });
    if (isDuplicate) {
      return res.status(400).json({
        status: 400,
        message: user_ids
          ? "Project with same name, description and users already exists"
          : "Project with same name and description already exists"
      });
    }

    // Create project if no duplicates
    const result = await projectService.create({ name, description, user_ids });
    res.status(201).json({
      status: 201,
      message: "Project created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message || "Failed to create project"
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const projectId = +req.params.id;
    const { name, description, user_ids } = req.body;
    const whitespaceError = isValidProjectFields(name, description);
    if (whitespaceError) {
      return res.status(400).json({
        status: 400,
        message: whitespaceError
      });
    }
    // Kiểm tra project tồn tại
    const existingProject = await projectService.findOne(projectId);
    if (!existingProject) {
      return res.status(404).json({
        status: 404,
        message: "Project not found"
      });
    }

    // Log để debug
    console.log('Update request:', {
      existingProject,
      newData: { name, description, user_ids }
    });

    // Kiểm tra duplicate
    const isDuplicate = await projectService.isDuplicateProject(
      { name, description, user_ids },
      projectId
    );

    if (isDuplicate) {
      return res.status(400).json({
        status: 400,
        message: user_ids
          ? "Project with same name, description and users already exists"
          : "Project with same name and description already exists"
      });
    }

    // Thực hiện update
    await projectService.update(projectId, req.body);

    res.status(200).json({
      status: 200,
      message: "Project updated successfully"
    });

  } catch (error: any) {
    console.error('Update error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || "Failed to update project"
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  await projectService.remove(+req.params.id);
  res.json({
    status: 200, // Adding status for consistency
    message: "Project deleted successfully",
  });
};