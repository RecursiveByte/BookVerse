import axios from "@/lib/axios";


export const uploadBooksCSV = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post<{ successCount: number; failedCount: number }>("/admin/upload-books-csv", form);
};

export const editBook = (bookId: number, data: { title?: string; author?: string; year?: number }) =>
    axios.put<{ message: string }>("/admin/edit-book", { book_id: bookId, ...data });

export const deleteBook = (bookId: number) =>
    axios.delete<{ message: string }>("/admin/delete-book", { data: { book_id: bookId } });