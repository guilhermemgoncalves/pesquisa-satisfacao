import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './surveyController';
import { LanguageUtilsModule } from "../utils/languageUtilsModule";

@Module({
  imports: [LanguageUtilsModule],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
