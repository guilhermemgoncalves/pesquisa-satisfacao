import { HttpException, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import * as process from "process";
import { lastValueFrom } from "rxjs";
import { TranslationDto } from "../dtos/translation.dto";
import { AxiosResponse } from "axios";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class TranslatorService {
  private _textToTranslate : string;
  private reqHeaders = {
    "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_KEY,
    "Ocp-Apim-Subscription-Region": process.env.TRANSLATOR_LOCATION,
    "Content-type": "application/json",
    "X-ClientTraceId": uuidv4().toString()
  };
  private reqParams = {
    'api-version': '3.0',
    'to': 'pt-br'
  }
  private url = process.env.TRANSLATOR_ENDPOINT + "/translate"
  set textToTranslate(value: string) {
    this._textToTranslate = value;
  }
  /* sdk azure translation
  https://learn.microsoft.com/pt-br/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs
 */

  private readonly logger = new Logger(TranslatorService.name);
  constructor(private httpService: HttpService) {
  }

  public async execute() : Promise<string>{

    let result : TranslationDto
    const reqData = [{
      'text': this._textToTranslate
    }];
    try {
      this.logger.log("Serviço de Tradução em Execução")
      const {data} = await lastValueFrom(this.httpService.post<TranslationDto>(process.env.TRANSLATOR_ENDPOINT + "/translate", reqData, { params: this.reqParams,  headers: this.reqHeaders }));
      result = data[0]
    } catch (e) {
      this.logger.error("Erro ao acessar api de tradução:" + e.message)
      throw new HttpException(e.message, 400)
    }
    this.logger.log("Serviço de Tradução Concluido")
    const resultText  = result.translations[0].text;
    return resultText;
  }
}
