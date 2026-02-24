import { z } from 'zod';

export const addBooksSchema = z.object({
  books: z.array(
    z.object({
      title: z.string().min(1, 'Title is required'),
      author: z.string().min(1, 'Author is required'),
      year: z.number().int().min(1000).max(9999),
      availability: z.boolean().optional(),
    })
  ).min(1, 'At least one book is required')
});

export const editBookSchema = z.object({
  book_id: z.number().int().positive('Book ID must be positive'),
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  year: z.number().int().min(1000).max(9999).optional(),
  availability: z.boolean().optional(),
});

export const deleteBookSchema = z.object({
  book_id: z.number().int().positive('Book ID must be positive'),
});