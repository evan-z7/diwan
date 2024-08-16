/*
  Warnings:

  - Added the required column `depart` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `depart` INTEGER NOT NULL,
    ADD COLUMN `number` INTEGER NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `position` VARCHAR(191) NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NULL;
