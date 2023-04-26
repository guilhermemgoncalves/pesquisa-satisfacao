import {Injectable, Logger} from "@nestjs/common";
import {CreateSurveyDto} from "./dto/create-survey.dto";
import {TranslatorService} from "../language-services/translator/translator.service";
import {SentimentAnalysisService} from "../language-services/sentiment-analysis/sentiment-analysis.service";
import {ContentModeratorService} from "../language-services/content-moderator/content-moderator.service";
import {PrismaClient} from '@prisma/client'



@Injectable()
export class SurveyService {
    private readonly logger = new Logger(SurveyService.name);
    prismaClient = new PrismaClient();


    constructor(
        private tradutorService: TranslatorService,
        private sentimentAnalysisService: SentimentAnalysisService,
        private contentModeratorService: ContentModeratorService
    ) {
    }

    async create(createSurveyDto: CreateSurveyDto): Promise<any> {

        const {nickName, surveyMessage, category, rate} = createSurveyDto;

        this.contentModeratorService.inputText = surveyMessage;
        //TODO: Alterar extrair a limpeza de palavras de dentro da analise de sentimentos e limpar as frases e realizar a tradução dentro de seus respectivos serviços

        this.sentimentAnalysisService.offensiveWords = await this.contentModeratorService.getOffensiveWords();
        const surveySentiment = await this.sentimentAnalysisService.GetSentimentAnalisys(surveyMessage);
        const sentences = surveySentiment.sentences

        const result = await this.prismaClient.surveys.create({
            data: {
                rate: rate,
                category: category,
                surveyMessage: surveySentiment.originalText,
                nickname: nickName,
                translatedSurveyMessage: surveySentiment.originalText,
                sentiment_analysis: {
                    create: {
                        original_text: surveySentiment.originalText,
                        sentiment: surveySentiment.sentiment,
                        confidence_scores: {
                            create: {
                                positive: surveySentiment.confidenceScores.positive,
                                neutral: surveySentiment.confidenceScores.neutral,
                                negative: surveySentiment.confidenceScores.negative
                            }
                        }
                    }
                }
            }
        })

        console.log(sentences)

        for (const sentence of sentences) {
            const {text, sentiment, confidenceScores, length} = sentence;
            await this.prismaClient.sentence.create({
                data: {
                    text: text,
                    sentiment: sentiment,
                    length: length,
                    sentiment_analysis_id: result.sentiment_id,
                    confidence_scores: {
                        create: {
                            positive: confidenceScores.positive,
                            negative: confidenceScores.negative,
                            neutral: confidenceScores.neutral,
                        }
                    }
                }
            })
        }

        this.logger.log("Survey Criada com Sucesso");
        // return result;
    }

    async findAll() {
        return this.prismaClient.surveys.findMany({

                include: {
                    sentiment_analysis: {
                        include:
                            {
                                sentence:
                                    {
                                        include:
                                            {confidence_scores: true}
                                    },
                                confidence_scores: true
                            }
                    }
                }
            }
        )
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
