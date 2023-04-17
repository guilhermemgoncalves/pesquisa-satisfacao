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

    //Transformando e-mail do usuário em hash (para não armazenar email)
    // const hash = await bcrypt.hash(createSurveyDto.userEmail, await bcrypt.genSalt());
    // console.log(hash)



    let jorge= { newuob: "niobiuo", Outro: { outro: "outro"}}
    let al = { name: "pedro", age: 18, email:"Gmail@uo", DataType: jorge}

    const createdSurvey =  new this.surveyModel(al)
    return createdSurvey.save();

    // this.tradutorService.textToTranslate = createSurveyDto.comentario
    // return await this.tradutorService.execute();

    // this.contentModeratorService.inputText = createSurveyDto.comentario
    // return await this.contentModeratorService.execute()

    //
    // this.tradutorService.textToTranslate = this.contentModeratorService.textOutput;
    // const translateResult = await this.tradutorService.execute();
    //
    // this.sentimentAnalysisService.textToAnalysis = [translateResult]
    //
    // await this.sentimentAnalysisService.Execute();
    // return this.sentimentAnalysisService.analisysResponse
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
