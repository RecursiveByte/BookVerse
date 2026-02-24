import { prisma } from "../lib/prisma";
// import logger from "../utils/logger";

class BookService {
  async getBooksWithReviews() {
    const books = await prisma.book.findMany({
      include: {
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      image_url: book.image_url,
      totalReviews: book.reviews.length,
      reviews: book.reviews.map((review) => ({
        reviewId: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewedBy: {
          userId: review.user.id,
          name: review.user.name,
          email: review.user.email,
        },
      })),
    }));
  }
}

export const bookService = new BookService();