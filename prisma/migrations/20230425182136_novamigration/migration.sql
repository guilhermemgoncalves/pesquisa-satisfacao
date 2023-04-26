/*
  Warnings:

  - You are about to drop the column `confidence_scores_id` on the `sentiment_analysis` table. All the data in the column will be lost.
  - You are about to drop the column `sentence_id` on the `sentiment_analysis` table. All the data in the column will be lost.
  - Added the required column `sentiment_analysis_id` to the `sentence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sentiment_analysis` DROP FOREIGN KEY `sentiment_analysis_ibfk_1`;

-- DropForeignKey
ALTER TABLE `sentiment_analysis` DROP FOREIGN KEY `sentiment_analysis_ibfk_2`;

-- AlterTable
ALTER TABLE `confidence_scores` ADD COLUMN `sentence_id` INTEGER NULL,
    ADD COLUMN `sentiment_analysis_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `sentence` ADD COLUMN `sentiment_analysis_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sentiment_analysis` DROP COLUMN `confidence_scores_id`,
    DROP COLUMN `sentence_id`;

-- CreateIndex
CREATE INDEX `confidence_scores_ibfk_1` ON `confidence_scores`(`sentiment_analysis_id`);

-- CreateIndex
CREATE INDEX `confidence_scores_ibfk_2` ON `confidence_scores`(`sentence_id`);

-- CreateIndex
CREATE INDEX `sentence_ibfk_1` ON `sentence`(`sentiment_analysis_id`);

-- AddForeignKey
ALTER TABLE `confidence_scores` ADD CONSTRAINT `confidence_scores_ibfk_1` FOREIGN KEY (`sentiment_analysis_id`) REFERENCES `sentiment_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `confidence_scores` ADD CONSTRAINT `confidence_scores_ibfk_2` FOREIGN KEY (`sentence_id`) REFERENCES `sentence`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sentence` ADD CONSTRAINT `sentence_ibfk_1` FOREIGN KEY (`sentiment_analysis_id`) REFERENCES `sentiment_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
