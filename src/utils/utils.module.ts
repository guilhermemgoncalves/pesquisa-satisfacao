import { Module } from '@nestjs/common';
import { HttpHelperService } from './http-helper/http-helper.service';
import { HttpModule } from "@nestjs/axios";
import { CleanOffensiveWords } from "./clear-offensive-words/clean-offensive-words";

@Module({
  imports: [HttpModule],
  providers: [HttpHelperService, CleanOffensiveWords],
  exports: [HttpHelperService, CleanOffensiveWords]
})
export class UtilsModule {}
