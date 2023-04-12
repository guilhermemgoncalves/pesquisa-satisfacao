import { Injectable, Logger } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { TranslatorService } from "../utils/tradutor/translator.service";
import { SentimentAnalysisService } from "../utils/sentiment-analysis/sentiment-analysis.service";
import { SentimentAnalysis } from "../utils/models/SentmentAnalysis";



@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name)
  constructor(private tradutorService: TranslatorService,private sentimentAnalysisService: SentimentAnalysisService) {
  }

  async create(createComentarioDto: CreateSurveyDto) : Promise<SentimentAnalysis> {
    this.tradutorService.textToTranslate = createComentarioDto.comentario;
    const translateResult = await this.tradutorService.translate();
    this.logger.log(translateResult);

    this.sentimentAnalysisService.textToAnalysis = [translateResult]
    await this.sentimentAnalysisService.Execute();
    return this.sentimentAnalysisService.analisysResponse
  }

  findAll() {
    return `This action returns all comentarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateComentarioDto: UpdateSurveyDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
