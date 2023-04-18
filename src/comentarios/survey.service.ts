import { Injectable, Logger } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { TranslatorService } from "../language-services/translator/translator.service";
import { SentimentAnalysisService } from "../language-services/sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "../language-services/content-moderator/content-moderator.service";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Survey } from "./entities/survey.entity";
import { Model } from "mongoose";
import * as timers from "timers";
import { dateTimestampProvider } from "rxjs/internal/scheduler/dateTimestampProvider";

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name)
  constructor(
    private tradutorService: TranslatorService,
    private sentimentAnalysisService: SentimentAnalysisService,
    private contentModeratorService : ContentModeratorService,
    @InjectModel(Survey.name) private surveyModel: Model<Survey>) {
  }

  async create(createSurveyDto: CreateSurveyDto) : Promise<any> {

    this.contentModeratorService.inputText = createSurveyDto.surveyMessage;
    const offensiveTerms = await this.contentModeratorService.getOffensiveWords();

    console.log(await this.sentimentAnalysisService.Execute(createSurveyDto.surveyMessage))
    return  offensiveTerms;

  }

  async findAll() {
    return `this action return all survey`
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
