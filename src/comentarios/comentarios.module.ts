import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { LanguageUtilsModule } from "../utils/languageUtilsModule";

@Module({
  imports: [LanguageUtilsModule],
  controllers: [ComentariosController],
  providers: [ComentariosService]
})
export class ComentariosModule {}
