import logger from "../utils/logger";
import HTTP_STATUS from "../utils/statusCodes";
import { bookService } from "../services/book.service";
import { Request, Response } from "express";


export const getBooksWithReviews = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 24;
    const search = req.query.search as string | undefined;

    const books = await bookService.getBooksWithReviews(page, limit, search);

    return res.status(HTTP_STATUS.OK).json({ books });
  } catch (error: any) {
    logger.error("Error in getBooksWithReviews controller:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const booksCount = async (req: Request, res: Response) => {
  try {
    const PAGE_SIZE = 8;
    const search = req.query.search as string | undefined;

    const totalBooks = await bookService.booksCount(search);

    const lastPage = Math.ceil(totalBooks / PAGE_SIZE);

    return res.status(HTTP_STATUS.OK).json({ totalBooks, lastPage });
  } catch (error: any) {
    logger.error("Error in booksCount controller:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};