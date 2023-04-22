import { Injectable, Logger } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { TranslatorService } from "../language-services/translator/translator.service";
import { SentimentAnalysisService } from "../language-services/sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "../language-services/content-moderator/content-moderator.service";
import { InjectModel } from "@nestjs/mongoose";
import { Survey } from "./entities/survey.entity";
import { Model } from "mongoose";

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    private tradutorService: TranslatorService,
    private sentimentAnalysisService: SentimentAnalysisService,
    private contentModeratorService: ContentModeratorService,
    @InjectModel(Survey.name) private surveyModel: Model<Survey>) {
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<any> {

    this.contentModeratorService.inputText = createSurveyDto.surveyMessage;
    //TODO: Alterar extrair a limpeza de palavras de dentro da analise de sentimentos e limpar as frases e realizar a tradução dentro de seus respectivos serviços

    this.sentimentAnalysisService.offensiveWords = await this.contentModeratorService.getOffensiveWords();
    let survey: Survey = new Survey();
    survey.surveySentiment = await this.sentimentAnalysisService.GetSentimentAnalisys(createSurveyDto.surveyMessage);
    this.logger.log("Survey Criada com Sucesso")
    console.log(survey);
    return survey;
  }

  async findAll() {
    return `this action return all survey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  // update(id: number, updateSurveyDto: UpdateSurveyDto) {
  //   return `This action updates a #${id} comentario`;
  // }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
