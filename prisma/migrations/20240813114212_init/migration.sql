-- DropForeignKey
ALTER TABLE `relation` DROP FOREIGN KEY `Relation_depart_fkey`;

-- DropForeignKey
ALTER TABLE `relation` DROP FOREIGN KEY `Relation_orginalId_fkey`;

-- DropForeignKey
ALTER TABLE `relation` DROP FOREIGN KEY `Relation_postId_fkey`;

-- DropForeignKey
ALTER TABLE `relation` DROP FOREIGN KEY `Relation_recieverId_fkey`;

-- DropForeignKey
ALTER TABLE `relation` DROP FOREIGN KEY `Relation_senderId_fkey`;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_recieverId_fkey` FOREIGN KEY (`recieverId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_orginalId_fkey` FOREIGN KEY (`orginalId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_depart_fkey` FOREIGN KEY (`depart`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
