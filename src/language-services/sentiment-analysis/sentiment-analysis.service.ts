import { Injectable, Logger } from "@nestjs/common";
import { AzureKeyCredential, SentimentAnalysisResult, TextAnalysisClient } from "@azure/ai-language-text";
import * as process from "process";
import { SentimentAnalysis } from "../dtos/sentiment-analysis.dto";

@Injectable()
export class SentimentAnalysisService {

  private readonly logger = new Logger(SentimentAnalysisService.name)
  private _offensiveWords : string[];

  set offensiveWords(value: string[]) {
    this._offensiveWords = value;
  }

  private _analisysResponse : SentimentAnalysis;

  async Execute(textToAnalysis: string) {
    const client = new TextAnalysisClient(process.env.LANGUAGE_SERVICE_ENDPOINT, new AzureKeyCredential(process.env.LANGUAGE_SERVICE_KEY));
    this.logger.log("Inicio da Analise de Sentimentos")

    let results : SentimentAnalysisResult[] = await client.analyze("SentimentAnalysis", [textToAnalysis]);

    for (const result of results) {
      if (result.error === undefined) {

        let resultManipulation = JSON.parse(JSON.stringify(result));

        delete resultManipulation.id
        delete resultManipulation['warnings']

        for (let sentence of resultManipulation.sentences)
        {
          delete sentence['offset']
          delete sentence['opinions']

        }

        this._analisysResponse = resultManipulation;

      } else {
        console.error("Encountered an error:", result.error);
      }
    }
    this.logger.log("Analise de Sentimentos Concluida")
    this._analisysResponse.originalText = textToAnalysis
    return this._analisysResponse
  }
}
