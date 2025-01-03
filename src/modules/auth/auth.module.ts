import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CommentService } from '../comment/comment.service';
import { PostService } from '../post/post.service';
import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PostService,
    CommentService
  ],
  exports: [AuthService],
})
export class AuthModule { }
