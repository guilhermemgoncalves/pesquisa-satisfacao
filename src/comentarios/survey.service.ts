import { Injectable, Logger } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { TranslatorService } from "../language-services/translator/translator.service";
import { SentimentAnalysisService } from "../language-services/sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "../language-services/content-moderator/content-moderator.service";
import { Survey } from "./entities/survey.entity";

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    private tradutorService: TranslatorService,
    private sentimentAnalysisService: SentimentAnalysisService,
    private contentModeratorService: ContentModeratorService
  ) {
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<any> {

    const { nickName, surveyMessage, category, rate } = createSurveyDto;

    this.contentModeratorService.inputText = createSurveyDto.surveyMessage;
    //TODO: Alterar extrair a limpeza de palavras de dentro da analise de sentimentos e limpar as frases e realizar a tradução dentro de seus respectivos serviços

    this.sentimentAnalysisService.offensiveWords = await this.contentModeratorService.getOffensiveWords();
    let survey: Survey = new Survey();

    survey.surveySentiment = await this.sentimentAnalysisService.GetSentimentAnalisys(surveyMessage);
    survey.surveyMessage = survey.surveySentiment.originalText;
    survey.translatedSurveyMessage = survey.surveyMessage;

    survey.nickname = nickName;
    survey.category = category;
    survey.rate = rate;

    this.logger.log("Survey Criada com Sucesso");
    console.log(survey);

    return;
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
