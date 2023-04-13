import { Module } from '@nestjs/common';
import { TranslatorService } from './tradutor/translator.service';
import { HttpModule } from "@nestjs/axios";
import { SentimentAnalysisService } from "./sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "./content-moderator/content-moderator.service";

@Module({
  imports: [HttpModule],
  providers: [TranslatorService, SentimentAnalysisService, ContentModeratorService],
  exports:  [TranslatorService, SentimentAnalysisService, ContentModeratorService]
})
export class LanguageUtilsModule {}
