/*
  Warnings:

  - Made the column `rate` on table `surveys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sentiment_id` on table `surveys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surveyMessage` on table `surveys` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `surveys` DROP FOREIGN KEY `surveys_ibfk_1`;

-- AlterTable
ALTER TABLE `surveys` MODIFY `rate` INTEGER NOT NULL,
    MODIFY `sentiment_id` INTEGER NOT NULL,
    MODIFY `surveyMessage` VARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE `surveys` ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`sentiment_id`) REFERENCES `sentiment_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
