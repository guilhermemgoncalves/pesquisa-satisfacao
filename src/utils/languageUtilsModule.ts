import { Module } from '@nestjs/common';
import { TradutorService } from './tradutor/tradutor.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [TradutorService],
  exports:  [TradutorService]
})
export class LanguageUtilsModule {}
