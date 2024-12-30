import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthService } from 'src/modules/auth/auth.service';
import { PetService } from 'src/modules/pet/pet.service';
import { PostService } from 'src/modules/post/post.service';
import { UsersService } from 'src/modules/users/users.service';

export const providers = [
 UsersService,
 PetService,
 AuthService,
 PostService,
 {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
 },
];

export { AuthService, HttpExceptionFilter, PetService, PostService, UsersService };

