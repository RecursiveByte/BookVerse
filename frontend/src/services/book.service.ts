import axios from "@/lib/axios";
import type { BooksCountResponse } from "@/types/book.type";

export const getBooksWithReviews = (page: number, search?: string) =>
  axios.get("/books/bookReviews", {
    params: { page, ...(search ? { search } : {}) },
  });

export const getBooksCount = (search?: string) =>
  axios.get<BooksCountResponse>("/books/getBookCount", {
    params: { ...(search ? { search } : {}) },
  });