-- CreateTable
CREATE TABLE `confidence_scores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `positive` FLOAT NULL,
    `neutral` FLOAT NULL,
    `negative` FLOAT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(1200) NULL,
    `sentiment` VARCHAR(20) NULL,
    `length` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentiment_analysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `original_text` VARCHAR(1000) NULL,
    `confidence_scores_id` INTEGER NOT NULL,
    `sentiment` VARCHAR(20) NOT NULL,
    `sentence_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `confidence_scores_id`(`confidence_scores_id`),
    INDEX `sentence_id`(`sentence_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL,
    `category` VARCHAR(30) NOT NULL,
    `rate` INTEGER NULL,
    `sentiment_id` INTEGER NULL,
    `surveyMessage` VARCHAR(1000) NULL,
    `translatedSurveyMessage` VARCHAR(1200) NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `nickname`(`nickname`),
    INDEX `sentiment_id`(`sentiment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sentiment_analysis` ADD CONSTRAINT `sentiment_analysis_ibfk_1` FOREIGN KEY (`confidence_scores_id`) REFERENCES `confidence_scores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sentiment_analysis` ADD CONSTRAINT `sentiment_analysis_ibfk_2` FOREIGN KEY (`sentence_id`) REFERENCES `sentence`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `surveys` ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`sentiment_id`) REFERENCES `sentiment_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
