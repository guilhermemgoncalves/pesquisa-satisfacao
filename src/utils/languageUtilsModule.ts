import { Module } from '@nestjs/common';
import { TranslatorService } from './tradutor/translator.service';
import { HttpModule } from "@nestjs/axios";
import { SentimentAnalysisService } from "./sentiment-analysis/sentiment-analysis.service";

@Module({
  imports: [HttpModule],
  providers: [TranslatorService, SentimentAnalysisService],
  exports:  [TranslatorService, SentimentAnalysisService]
})
export class LanguageUtilsModule {}
