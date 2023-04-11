import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComentariosModule } from './comentarios/comentarios.module';


@Module({
  imports: [ComentariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
