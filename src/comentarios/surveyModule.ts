import {Module} from '@nestjs/common';
import {SurveyService} from './survey.service';
import {SurveyController} from './surveyController';
import {LanguageServicesModule} from "../language-services/languageServicesModule";

@Module({
  imports: [LanguageServicesModule],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
