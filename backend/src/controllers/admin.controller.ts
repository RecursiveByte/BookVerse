import { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { editBookSchema, deleteBookSchema } from "../validations/admin.validation";
import logger from "../utils/logger";
import HTTP_STATUS from "../utils/statusCodes";
import { z } from "zod";

export const uploadBooksFromCSV = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    console.log(user)
    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can upload books" });
    }

    if (!req.file) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "CSV file is required" });
    }

    const result = await adminService.uploadBooksFromCSV(req.file);

    logger.info(`${result.successCount} books uploaded successfully`);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "CSV processed successfully",
      successCount: result.successCount,
      failedCount: result.failedCount,
    });
  } catch (error: any) {
    logger.error({ err: error }, "Error in uploadBooksFromCSV controller");
    if(error.message == "book already present")
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: "Book already exists in the database",
      });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const editBook = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user?.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admin can edit books" });
    }

    const validatedData = editBookSchema.parse(req.body);

    await adminService.updateBook(validatedData);

    logger.info(`Book ${validatedData.book_id} updated successfully`);

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Book updated successfully" });
  } catch (error: any) {
    logger.error({ err: error }, "Error in admin controller");

    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error.message === "Book not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can delete books" });
    }

    const validatedData = deleteBookSchema.parse(req.body);

    await adminService.deleteBook(validatedData.book_id);

    logger.info(`Book ${validatedData.book_id} deleted successfully`);

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Book deleted successfully" });
  } catch (error: any) {
    logger.error("Error in deleteBook controller:", error);

    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error.message === "Book not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can view users" });
    }

    const users = await adminService.getAllUsers();

    return res.status(HTTP_STATUS.OK).json({ users });
  } catch (error: any) {
    logger.error({ err: error }, "Error in getAllUsers controller");
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }

  
};


export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can view reviews" });
    }

    const reviews = await adminService.getAllReviews();

    return res.status(HTTP_STATUS.OK).json({ reviews });
  } catch (error: any) {
    logger.error({ err: error }, "Error in getAllReviews controller");
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can delete users" });
    }

    const { email } = req.body;

    if (!email) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Email is required" });
    }

    await adminService.deleteUser(email);

    logger.info(`User ${email} deleted successfully`);

    return res.status(HTTP_STATUS.OK).json({ message: "User deleted successfully" });
  } catch (error: any) {
    logger.error({ err: error }, "Error in deleteUser controller");

    if (error.message === "User not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }

  
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Only admins can view stats" });
    }

    const stats = await adminService.getStats();

    return res.status(HTTP_STATUS.OK).json(stats);
  } catch (error: any) {
    logger.error({ err: error }, "Error in getStats controller");
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: error.message,
    });
  }
};