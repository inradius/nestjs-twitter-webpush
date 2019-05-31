import { Controller, Get, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }

  @Get('preload')
  getPreload(@Res() response: Response): any {
    return this.appService.getPreload(response);
  }

  @Post('subscribe')
  postSubscribe(@Req() request: Request): void {
    return this.appService.postSubscribe(request);
  }
}
