import { HttpException, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import * as process from "process";
import { lastValueFrom } from "rxjs";
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
  set textToTranslate(value: string) {
    this._textToTranslate = value;
  }
  /* sdk azure translation
  https://learn.microsoft.com/pt-br/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs
 */

  private readonly logger = new Logger(TranslatorService.name);
  constructor(private httpService: HttpService) {
  }

  public async translate() : Promise<string>{

    let result
    const data = [{
      'text': this._textToTranslate
    }];
    try {
      this.logger.log("Serviço de Tradução em Execução")
      result = await lastValueFrom(this.httpService.post(process.env.TRANSLATOR_ENDPOINT + "/translate", data, { params: this.reqParams,  headers: this.reqHeaders }));
    } catch (e) {
      this.logger.error("Erro ao acessar api de tradução:" + e.message)
      throw new HttpException(e.message, 400)
    }
    this.logger.log("Serviço de Tradução Concluido")
    result  = result.data[0].translations[0].text;
    return result;
  }
}
