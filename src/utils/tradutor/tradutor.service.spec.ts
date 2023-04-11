import { Test, TestingModule } from '@nestjs/testing';
import { TradutorService } from './tradutor.service';

describe('TradutorService', () => {
  let service: TradutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradutorService],
    }).compile();

    service = module.get<TradutorService>(TradutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
