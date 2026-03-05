import { z } from "zod";

export const addReviewSchema = z.object({
  book_id: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export const editReviewSchema = z.object({
  reviewId: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
});

export const deleteReviewSchema = z.object({
  review_id: z.number().int()
});
