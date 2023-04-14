import { Injectable, Logger } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { TranslatorService } from "../language-services/translator/translator.service";
import { SentimentAnalysisService } from "../language-services/sentiment-analysis/sentiment-analysis.service";
import { ContentModeratorService } from "../language-services/content-moderator/content-moderator.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name)
  constructor(private tradutorService: TranslatorService,private sentimentAnalysisService: SentimentAnalysisService, private contentModeratorService : ContentModeratorService) {
  }

  async create(createSurveyDto: CreateSurveyDto) : Promise<any> {

    //Transformando e-mail do usuário em hash (para não armazenar email)
    const hash = await bcrypt.hash(createSurveyDto.userEmail, await bcrypt.genSalt());
    console.log(hash)


    this.contentModeratorService.textInput = createSurveyDto.comentario
    await this.contentModeratorService.execute()

    this.tradutorService.textToTranslate = this.contentModeratorService.textOutput;
    const translateResult = await this.tradutorService.execute();

    this.sentimentAnalysisService.textToAnalysis = [translateResult]

    await this.sentimentAnalysisService.Execute();
    return this.sentimentAnalysisService.analisysResponse
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
