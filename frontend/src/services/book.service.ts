import axios from "@/lib/axios";
import type { BooksCountResponse } from "@/types/book.type";

export const getBooksWithReviews = (page: number) =>
  axios.get("/books/bookReviews", {
    params: { page },
  });

export const getBooksCount = () =>
  axios.get<BooksCountResponse>("/books/getBookCount");
