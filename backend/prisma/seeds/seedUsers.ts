import { prisma } from "../../src/lib/prisma";
import bcrypt from "bcryptjs";

export async function seedUsers() {
  const adminPassword = await bcrypt.hash("", 10);
  const johnPassword = await bcrypt.hash("", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@bookverse.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: johnPassword,
        role: "user",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Users seeded successfully");
}
