import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SurveyModule } from "./comentarios/surveyModule";
import { ConfigModule } from "@nestjs/config";
import { UtilsModule } from "./utils/utils.module";


@Module({
  imports: [SurveyModule, ConfigModule.forRoot(
    { envFilePath: ".env" }
  ), UtilsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
