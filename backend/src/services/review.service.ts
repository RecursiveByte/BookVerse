import { prisma } from "../lib/prisma";

class ReviewService {
  async addReview(user_id: number, data: {
    book_id: number;
    rating: number;
    comment?: string;
  }) {
    const book = await prisma.book.findUnique({
      where: { id: data.book_id },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return await prisma.review.create({
      data: {
        user_id,
        book_id: data.book_id,
        rating: data.rating,
        comment: data.comment,
      },
    });
  }

  async editReview(user_id: number, data: {
    reviewId: number;
    rating?: number;
    comment?: string;
  }) {
    const review = await prisma.review.findUnique({
      where: { id: data.reviewId },

    });
    if (!review) {
      throw new Error("Review not found");
    }

    if (review.user_id !== user_id) {
      throw new Error("Forbidden");
    }

    return await prisma.review.update({
      where: { id: data.reviewId },
      data: {
        rating: data.rating,
        comment: data.comment,
      },
    });
  }

  async deleteReview(user_id: number, reviewId: number) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    if (review.user_id !== user_id) {
      throw new Error("Forbidden");
    }

    return await prisma.review.delete({
      where: { id: reviewId },
    });
  }
}

export const reviewService = new ReviewService();
