import { HttpException, Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import * as process from "process";
import { ContentModeratorDto, Term } from "../dtos/content-moderator.dto";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class ContentModeratorService {
  get textOutput(): string {
    return this._textOutput;
  }
  set textInput(value: string) {
    this._textInput = value;
  }

  private readonly logger = new Logger(ContentModeratorService.name);
  private _textInput : string;
  private _textOutput : string;
  constructor(private httpService: HttpService) {
  }

  private reqHeaders = {
    "Ocp-Apim-Subscription-Key": process.env.CONTENT_MODERATOR_KEY,
    "Ocp-Apim-Subscription-Region": process.env.CONTENT_MODERATOR_LOCATION,
    "Content-Type": "text/plain"
  };
  private reqParams = {
    "autocorrect": "False",
    "PII": "True",
    "classify": "True",
    "language": "por",
  }

  /* sdk azure content moderator
  https://westus.dev.cognitive.microsoft.com/docs/services/57cf753a3f9b070c105bd2c1/operations/57cf753a3f9b070868a1f66f
  https://learn.microsoft.com/pt-br/azure/cognitive-services/content-moderator/client-libraries?tabs=visual-studio&pivots=programming-language-rest-api#moderate-text
 */

  public async execute() : Promise<ContentModeratorDto>{

    let result
    let resultData : ContentModeratorDto
    const dataText = {
      'text': this._textInput
    };
    try {
      this.logger.log("Serviço de moderação de conteudo em Execução")
      result = await lastValueFrom(this.httpService.post<ContentModeratorDto>(process.env.CONTENT_MODERATOR_ENDPOINT + "/contentmoderator/moderate/v1.0/ProcessText/Screen", dataText, { params: this.reqParams,  headers: this.reqHeaders }));

    } catch (e) {
      this.logger.error("Erro ao acessar api de tradução:" + e.message)
      console.log(e)
      throw new HttpException(e.message, 400)
    }
    this.logger.log("Serviço de moderação de conteudo Concluido")

    resultData = this.processWords(result.data)
    this._textOutput = this.cleanOfensiveWords(resultData)

    return resultData;
  }

  processWords(dataResult): ContentModeratorDto{
    let stringResult = JSON.stringify(dataResult)
    while (stringResult.includes("\"{\\\"text\\\":\\\"")){
      stringResult = stringResult.replace("\"{\\\"text\\\":\\","")
    }
    while (stringResult.includes("\\\"}")){
      stringResult = stringResult.replace("\\\"}","")
    }
    return JSON.parse(stringResult);
  }
  cleanOfensiveWords(contentModeratorResponse : ContentModeratorDto){

    let terms : Term[] = contentModeratorResponse.Terms
    let originalText : string  = contentModeratorResponse.OriginalText

    if (terms == null || terms.length == 0){
      return originalText ;
    }

    let manipulatedText = originalText

    for(const term of terms){
      manipulatedText = manipulatedText.replace(term.Term, "*****" )
    }
    return manipulatedText
  }
}


