/*
  Warnings:

  - You are about to drop the column `spicyLevelNumber` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `delivery` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `spicyLevelNumber`;
