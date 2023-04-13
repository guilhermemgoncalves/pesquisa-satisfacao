import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './comentarios/surveyModule';
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [SurveyModule, ConfigModule.forRoot(
    {envFilePath: '.env'}
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
