import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('index', () => {
    const indexString: string = 'Hilti PWA API works!';
    it(`Should return "${indexString}"`, () => {
      expect(appController.getIndex()).toBe(indexString);
    });
  });
});
