import { Injectable, Logger } from "@nestjs/common";
import * as process from "process";
import { ContentModeratorDto, Term } from "../dtos/content-moderator.dto";
import { HttpHelperService } from "../../utils/http-helper/http-helper.service";
import { isString } from "@nestjs/common/utils/shared.utils";

@Injectable()
export class ContentModeratorService {

  set inputText(value: string) {
    if(!isString(value)){
      throw new TypeError("O campo deve ser preenchido com um valor do tipo texto")
    }
    this._inputText = value;
  }

  private readonly logger = new Logger(ContentModeratorService.name);
  private _inputText : string;
  constructor(private httpHelperService: HttpHelperService) {
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
  private url: string = process.env.CONTENT_MODERATOR_ENDPOINT + "/contentmoderator/moderate/v1.0/ProcessText/Screen"

  /* sdk azure content moderator
  https://westus.dev.cognitive.microsoft.com/docs/services/57cf753a3f9b070c105bd2c1/operations/57cf753a3f9b070868a1f66f
  https://learn.microsoft.com/pt-br/azure/cognitive-services/content-moderator/client-libraries?tabs=visual-studio&pivots=programming-language-rest-api#moderate-text
 */

  public async execute() : Promise<string>{

    let responseData : ContentModeratorDto
    const reqData = this._inputText;
    this.httpHelperService.url = this.url;
    this.httpHelperService.params = this.reqParams;
    this.httpHelperService.headers = this.reqHeaders;

    responseData  = await this.httpHelperService.Post<ContentModeratorDto>(reqData)

    this.logger.log("Serviço de moderação de conteudo Concluido")

    return this.cleanOffensiveWords(responseData);
  }
  private cleanOffensiveWords(contentModeratorResponse : ContentModeratorDto): string{

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


