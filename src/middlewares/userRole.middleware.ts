import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { errorResponse } from 'src/common/utils/response.utils';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserRoleMiddleware implements NestMiddleware {
 constructor(private readonly userService: UserService) { }

 async use(req: Request, res: Response, next: NextFunction) {

  const { username } = req.body;

  if (!username) {
   return errorResponse(res, 400, 'Username is required');
  }
  const user: any = await this.userService.findUserRole(username);

  if (!user || user.roles.toString() !== 'admin') {
   return errorResponse(res, 404, 'User not found');
  }
  req['user'] = { username: user.username };
  next();
 }
}
