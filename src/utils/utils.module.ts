import { Module } from '@nestjs/common';
import { HttpHelperService } from './http-helper/http-helper.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [HttpHelperService],
  exports: [HttpHelperService]
})
export class UtilsModule {}
