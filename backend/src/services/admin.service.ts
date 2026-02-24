import { prisma } from "../lib/prisma";
import fs from "fs";
import csv from "csv-parser";
import logger from "../utils/logger";

interface BookInput {
  title: string;
  author: string;
  year: number;
  image_url?: string | null;
}

class AdminService {
  async uploadBooksFromCSV(
    file: Express.Multer.File
  ): Promise<{ successCount: number; failedCount: number }> {
    const books: BookInput[] = [];

    try {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(csv())
          .on("data", (row) => {
            books.push({
              title: row.title?.trim(),
              author: row.author?.trim(),
              year: parseInt(row.year, 10),
              image_url: row.image_url?.trim() || null,
            });
          })
          .on("end", resolve)
          .on("error", reject);
      });

      const validBooks = books.filter(
        (b) => b.title && b.author && !isNaN(b.year)
      );

      const result = await prisma.book.createMany({
        data: validBooks.map((b) => ({
          title: b.title.replace(/[^a-zA-Z0-9 ]/g, "").trim(),
          author: b.author,
          year: b.year,
          image_url: b.image_url,
        })),
        skipDuplicates: true,
      });

      const invalidCount = books.length - validBooks.length;
      const duplicateCount = validBooks.length - result.count;

      return {
        successCount: result.count,
        failedCount: invalidCount + duplicateCount,
      };
    } catch (error: any) {
      logger.error("CSV Processing Error:", error);
      throw new Error("Failed to process CSV file");
    } finally {
      if (fs.existsSync(file.path)) {
        await fs.promises.unlink(file.path);
      }
    }
  }

  async updateBook(data: {
    book_id: number;
    title?: string;
    author?: string;
    year?: number;
  }): Promise<void> {
    const { book_id, ...updateData } = data;

    const existingBook = await prisma.book.findUnique({
      where: { id: book_id },
    });

    if (!existingBook) {
      throw new Error("Book not found");
    }

    await prisma.book.update({
      where: { id: book_id },
      data: updateData,
    });
  }

  async deleteBook(bookId: number): Promise<void> {
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      throw new Error("Book not found");
    }

    await prisma.book.delete({
      where: { id: bookId },
    });
  }
}

export const adminService = new AdminService();
