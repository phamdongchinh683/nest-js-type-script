import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body ? JSON.stringify(req.body) : 'No Body';
    console.log(`[${req.method}] - ${req.baseUrl} - Body: ${body}`);
    if (JSON.parse(body).body === '123') {
      req['example'] = 'Admin ne';
    } else {
      req['example'] = 'user ne';
    }
    next();
  }
}
