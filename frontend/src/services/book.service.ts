import axios from "@/lib/axios";

export const getBooksWithReviews = () =>
  axios.get("/books/bookReviews");