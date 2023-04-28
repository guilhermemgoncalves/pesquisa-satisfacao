import { Module } from "@nestjs/common";

import { SurveyModule } from "./comentarios/surveyModule";
import { ConfigModule } from "@nestjs/config";
import { UtilsModule } from "./utils/utils.module";


@Module({
  imports: [SurveyModule, ConfigModule.forRoot(
    { envFilePath: ".env" }
  ), UtilsModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
