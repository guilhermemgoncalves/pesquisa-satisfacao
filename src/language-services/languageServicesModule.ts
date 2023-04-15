import { Module } from '@nestjs/common';
import { TranslatorService } from './translator/translator.service';
import { HttpModule } from "@nestjs/axios";
import { SentimentAnalysisService } from "./sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "./content-moderator/content-moderator.service";
import { UtilsModule } from "../utils/utils.module";

@Module({
  imports: [HttpModule, UtilsModule],
  providers: [TranslatorService, SentimentAnalysisService, ContentModeratorService],
  exports:  [TranslatorService, SentimentAnalysisService, ContentModeratorService]
})
export class LanguageServicesModule {}
