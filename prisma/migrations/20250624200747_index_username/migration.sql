-- DropIndex
DROP INDEX "User_email_idx";

-- CreateIndex
CREATE INDEX "User_email_username_idx" ON "User"("email", "username");
