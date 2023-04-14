import { Module } from '@nestjs/common';
import { HttpHelperService } from './http-helper/http-helper.service';

@Module({
  providers: [HttpHelperService],
  exports: [HttpHelperService]
})
export class UtilsModule {}
