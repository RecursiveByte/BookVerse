-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "year" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "image_url" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Reviews_user_id_idx" ON "Reviews"("user_id");

-- CreateIndex
CREATE INDEX "Reviews_book_id_idx" ON "Reviews"("book_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
