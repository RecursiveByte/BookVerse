import logger from "../utils/logger";
import HTTP_STATUS from "../utils/statusCodes";
import { bookService } from "../services/book.service";
import { Request, Response } from "express";

export const getBooksWithReviews = async (req: Request, res: Response) => {
    try {
      const books = await bookService.getBooksWithReviews();
      return res.status(HTTP_STATUS.OK).json({ books });
    } catch (error: any) {
      logger.error("Error in getBooksWithReviews controller:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };