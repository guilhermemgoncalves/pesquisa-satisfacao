import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './surveyController';
import { LanguageServicesModule } from "../language-services/languageServicesModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Survey, SurveySchema } from "./entities/survey.entity";

@Module({
  imports: [LanguageServicesModule, MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }])],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
