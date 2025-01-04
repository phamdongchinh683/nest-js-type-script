import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthService } from 'src/modules/auth/auth.service';
import { PostService } from 'src/modules/post/post.service';
import { UserService } from 'src/modules/user/user.service';

export const providersApp = [
 UserService,
 AuthService,
 PostService,
 {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
 },
];

