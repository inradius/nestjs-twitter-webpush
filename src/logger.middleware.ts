import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: Function) {
    console.log('[Request]', request.method, request.path);
    next();
  }
}
