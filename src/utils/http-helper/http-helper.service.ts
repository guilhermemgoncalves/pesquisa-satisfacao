import { HttpException, Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { TranslationDto } from "../../language-services/dtos/translation.dto";
import process from "process";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class HttpHelperService {
  set params(value) {
    this._params = value;
  }
  set headers(value) {
    this._headers = value;
  }
  set url(value: string) {
    this._url = value;
  }

  private readonly logger = new Logger(HttpHelperService.name);

  private _params;
  private _headers;
  private _url: string;

  constructor(private httpService: HttpService) {
  }
  async Post<T>(reqBody : any) : Promise<T> {


    try {
      const {data} = await lastValueFrom(this.httpService.post<T>(this._url, reqBody, { params: this._params,  headers: this._headers }));
      if(Array.isArray(data)){
        return data[0]
      }
      return data
    } catch (e) {
      this.logger.error(`Erro ao acessar api de ${['name']} :${e.message}`)
    }
  }
}
