import { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { editBookSchema, deleteBookSchema } from "../validations/admin.validation";
import logger from "../utils/logger";
import HTTP_STATUS from "../utils/statusCodes";
import { z } from "zod";

export const uploadBooksFromCSV = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

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
    logger.error("Error in uploadBooksFromCSV controller:", error);

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

    if (user.role !== "admin") {
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
    logger.error("Error in editBook controller:", error);

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
