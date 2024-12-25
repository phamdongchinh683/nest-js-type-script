import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';

export const providers = [
 UsersService,
 AuthService,
 {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
 },
];

export { AuthService, HttpExceptionFilter, UsersService };

