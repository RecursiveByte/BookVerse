/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OtpVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_email_key" ON "OtpVerification"("email");
