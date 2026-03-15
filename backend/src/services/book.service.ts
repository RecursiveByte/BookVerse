// import { prisma } from "../lib/prisma";

// class BookService {

//   async booksCount() {
//     const totalBooks = await prisma.book.count();
    
//     return totalBooks;
    
//     }

//   async getBooksWithReviews(page: number = 1, limit: number = 24) {
//     const skip = (page - 1) * limit;



//     const books = await prisma.book.findMany({
//       skip,
//       take: limit,
//       include: {
//         reviews: {
//           include: {
//             user: {
//               select: { id: true, name: true, email: true },
//             },
//           },
//         },
//       },
//       orderBy: {
//         id: "asc", 
//       },
//     });

//     return books.map((book) => ({
//       id: book.id,
//       title: book.title,
//       author: book.author,
//       year: book.year,
//       image_url: book.image_url,
//       totalReviews: book.reviews.length,
//       reviews: book.reviews.map((review) => ({
//         reviewId: review.id,
//         rating: review.rating,
//         comment: review.comment,
//         createdAt: review.createdAt,
//         reviewedBy: {
//           userId: review.user.id,
//           name: review.user.name,
//           email: review.user.email,
//         },
//       })),
//     }));
//   }
// }


// export const bookService = new BookService();

import { prisma } from "../lib/prisma";

class BookService {

  async booksCount(search?: string) {
    const where = search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : {};

    const totalBooks = await prisma.book.count({ where });
    return totalBooks;
  }

  async getBooksWithReviews(page: number = 1, limit: number = 24, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : {};

    const books = await prisma.book.findMany({
      skip,
      take: limit,
      where,
      include: {
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { id: "asc" },
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