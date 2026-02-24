import { prisma } from "../../src/lib/prisma";

export async function seedReviews() {
  const retesh = await prisma.user.findFirst({ where: { email: "opboy4885@gmail.com" } });
  const john = await prisma.user.findFirst({ where: { email: "john@example.com" } });
  const work = await prisma.user.findFirst({ where: { email: "workretesh12@gmail.com" } });

  const atomicHabits = await prisma.book.findFirst({ where: { title: "Atomic Habits" } });
  const sapiens = await prisma.book.findFirst({ where: { title: "Sapiens" } });
  const alchemist = await prisma.book.findFirst({ where: { title: "The Alchemist" } });
  const deepWork = await prisma.book.findFirst({ where: { title: "Deep Work" } });

  if (!retesh || !john || !work) {
    console.log("Some users not found — skipping reviews");
    return;
  }

  await prisma.review.createMany({
    data: [
      { user_id: retesh.id, book_id: atomicHabits!.id, rating: 5, comment: "Changed how I approach my daily routine completely. A must read." },
      { user_id: retesh.id, book_id: sapiens!.id, rating: 4, comment: "Fascinating read about human history. Makes you think differently." },
      { user_id: retesh.id, book_id: alchemist!.id, rating: 5, comment: "Beautiful story about following your dreams. Very inspiring." },
      { user_id: retesh.id, book_id: deepWork!.id, rating: 4, comment: "Practical advice on focused work. Helped me cut out distractions." },
      { user_id: retesh.id, book_id: atomicHabits!.id, rating: 5, comment: "Re-read this for the second time. Still as good as the first." },

      { user_id: john.id, book_id: alchemist!.id, rating: 5, comment: "Every page felt inspiring. One of those books that stays with you." },
      { user_id: john.id, book_id: sapiens!.id, rating: 5, comment: "Eye opening perspective on humanity. Everyone should read this." },
      { user_id: john.id, book_id: deepWork!.id, rating: 4, comment: "Really changed how I think about productivity and focus." },
      { user_id: john.id, book_id: atomicHabits!.id, rating: 4, comment: "Great practical framework for building better habits." },
      { user_id: john.id, book_id: alchemist!.id, rating: 5, comment: "Paulo Coelho writes with such simplicity yet deep meaning." },

      { user_id: work.id, book_id: sapiens!.id, rating: 5, comment: "Yuval Harari is a genius. This book blew my mind completely." },
      { user_id: work.id, book_id: deepWork!.id, rating: 5, comment: "Cal Newport nails it. Deep work is the superpower of the future." },
      { user_id: work.id, book_id: atomicHabits!.id, rating: 5, comment: "Small changes, remarkable results. James Clear explains it perfectly." },
      { user_id: work.id, book_id: alchemist!.id, rating: 4, comment: "A short but powerful read about purpose and destiny." },
      { user_id: work.id, book_id: sapiens!.id, rating: 4, comment: "Second read and I noticed so many things I missed the first time." },
    ],
    skipDuplicates: true,
  });

  console.log("Reviews seeded successfully");
}