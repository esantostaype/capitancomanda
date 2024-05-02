/*
  Warnings:

  - You are about to drop the column `spicyLevel` on the `orderproducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderproducts` DROP COLUMN `spicyLevel`,
    ADD COLUMN `spicyLevelNumber` INTEGER NULL;
