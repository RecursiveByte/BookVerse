import { prisma } from "../src/lib/prisma";
// import { seedUsers } from "./seeds/seedUsers";
// import { seedBooks } from "./seeds/seedBooks";
import { seedReviews } from "./seeds/seedReviews";

async function main() {
  // await seedUsers();
  // await seedBooks();
  await seedReviews();
  console.log("Seeding completed successfully");
}

try {
  await main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}