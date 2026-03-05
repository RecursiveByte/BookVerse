import axios from "@/lib/axios";


export const editBook = (bookId: number, data: { title?: string; author?: string; year?: number }) =>
    axios.put<{ message: string }>("/admin/edit-book", { book_id: bookId, ...data });

export const deleteBook = (bookId: number) =>
    axios.delete<{ message: string }>("/admin/delete-book", { data: { book_id: bookId } });