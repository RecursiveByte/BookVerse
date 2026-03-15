import axios from "@/lib/axios";
import type{ UserRes } from "@/types/user.type";
import type { showReviews } from "@/types/review.type";
import type{ StatsResponse } from "@/types/user.type";


export const getStats = () =>
  axios.get<StatsResponse>("/admin/stats");

export const getAllUsers = () =>
  axios.get<{ users: UserRes[] }>("/admin/getAllUsers");

export const getAllReviews = () =>
  axios.get<{ reviews: showReviews[] }>("/admin/getAllReviews");


export const deleteUser = (email: string) =>
  axios.delete<{ message: string }>("/admin/delete-user", { data: { email: email } });

export const uploadBooksCSV = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post<{ successCount: number; failedCount: number }>("/admin/upload-books-csv", form);
};

export const editBook = (bookId: number, data: { title?: string; author?: string; year?: number }) =>
    axios.put<{ message: string }>("/admin/edit-book", { book_id: bookId, ...data });

export const deleteBook = (bookId: number) =>
    axios.delete<{ message: string }>("/admin/delete-book", { data: { book_id: bookId } });