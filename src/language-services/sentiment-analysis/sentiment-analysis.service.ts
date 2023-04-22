import { Injectable, Logger } from "@nestjs/common";
import { AzureKeyCredential, SentimentAnalysisResult, TextAnalysisClient } from "@azure/ai-language-text";
import * as process from "process";
import { SentimentAnalysis } from "../dtos/sentiment-analysis.dto";
import { CleanOffensiveWords } from "../../utils/clear-offensive-words/clean-offensive-words";

@Injectable()
export class SentimentAnalysisService {

  private readonly logger = new Logger(SentimentAnalysisService.name);
  private _offensiveWords: string[] = [];

  set offensiveWords(value: string[]) {
    this._offensiveWords = value;
  }

  constructor(private cleanOffensiveWords : CleanOffensiveWords ) {
  }

  private _analisysResponse: SentimentAnalysis;

  async GetSentimentAnalisys(textToAnalysis: string) {
    const client = new TextAnalysisClient(process.env.LANGUAGE_SERVICE_ENDPOINT, new AzureKeyCredential(process.env.LANGUAGE_SERVICE_KEY));
    this.logger.log("Inicio da Analise de Sentimentos");

    let results: SentimentAnalysisResult[] = await client.analyze("SentimentAnalysis", [textToAnalysis]);

    for (const result of results) {

      let resultManipulation = JSON.parse(JSON.stringify(result));

      delete resultManipulation.id;
      delete resultManipulation["warnings"];

      for (let sentence of resultManipulation.sentences) {
        delete sentence["offset"];
        delete sentence["opinions"];
      }

      this._analisysResponse = resultManipulation;
      this._analisysResponse.originalText = textToAnalysis;

      if(this._offensiveWords.length > 0 ){
          this.CallRemoveOffensiveWords(this._analisysResponse)
      }
    }

    this.logger.log("Analise de Sentimentos Concluida");

    return this._analisysResponse;
  }

  private CallRemoveOffensiveWords(_analisysResponse: SentimentAnalysis) {
    this._analisysResponse.originalText = this.cleanOffensiveWords.cleanOffensiveWords(this._offensiveWords, this._analisysResponse.originalText)

    if(this._analisysResponse.sentences== undefined || this._analisysResponse.sentences.length == 0 ){
      return
    }

    for (let sentence of this._analisysResponse.sentences) {
      sentence.text = this.cleanOffensiveWords.cleanOffensiveWords(this._offensiveWords, sentence.text)
    }


  }
}
