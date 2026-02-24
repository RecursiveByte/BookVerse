import { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import HTTP_STATUS from "../utils/statusCodes";
import logger from "../utils/logger";
import {
  addReviewSchema,
  editReviewSchema,
  deleteReviewSchema,
} from "../validations/review.validation";
import { z } from "zod";

export const addReview = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const validatedData = addReviewSchema.parse(req.body);

    await reviewService.addReview(user.id, validatedData);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Review added successfully",
    });
  } catch (error: any) {
    logger.error("Error in addReview:", error);

    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error.message === "Book not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
    });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const validatedData = editReviewSchema.parse(req.body);

    await reviewService.editReview(user.id, validatedData);

    return res.status(HTTP_STATUS.OK).json({
      message: "Review updated successfully",
    });
  } catch (error: any) {
    logger.error("Error in editReview:", error);

    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error.message === "Review not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
    }

    if (error.message === "Forbidden") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: "You can only edit your own review",
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { review_id } =
      deleteReviewSchema.parse(req.body);

    await reviewService.deleteReview(user.id, review_id);

    return res.status(HTTP_STATUS.OK).json({
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    logger.error("Error in deleteReview:", error);

    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error.message === "Review not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
    }

    if (error.message === "Forbidden") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: "You can only delete your own review",
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
    });
  }
};
