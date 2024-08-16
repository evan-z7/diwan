-- CreateTable
CREATE TABLE `Relation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recieverId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `orginalId` INTEGER NULL,
    `states` VARCHAR(191) NOT NULL,
    `depart` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_recieverId_fkey` FOREIGN KEY (`recieverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation` ADD CONSTRAINT `Relation_orginalId_fkey` FOREIGN KEY (`orginalId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
