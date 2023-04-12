import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './surveyController';
import { SurveyService } from './survey.service';

describe('ComentariosController', () => {
  let controller: SurveyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [SurveyService],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
