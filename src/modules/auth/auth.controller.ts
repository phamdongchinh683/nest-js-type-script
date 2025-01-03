import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/entities/user.model';

import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus, Role } from 'src/global/globalEnum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { CommentService } from '../comment/comment.service';
import { CommentCreateDto } from '../comment/dto/comment-create-dto';
import { CreatePostDto } from '../post/dto/post-create.dto';
import { PostListDto } from '../post/dto/post-list.dto';
import { PostService } from '../post/post.service';
import { AuthService } from './auth.service';
import { AuthLogin } from './dto/auth-login.dto';
import { AuthSignUp } from './dto/auth-signup.dto';
import { JwtResponse } from './dto/jwt-response.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService,
    private postsService: PostService,
    private commentService: CommentService
  ) { }
  @Post('login')
  async signIn(@Body() data: AuthLogin) {
    try {
      const user = await this.authService.signIn(data);
      return new ResponseData<JwtResponse>(
        user,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
  @Post('register')
  async signUp(@Body() data: AuthSignUp) {
    try {
      const user = await this.authService.register(data);
      return new ResponseData<string>(
        user,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<string>(
        e.message || 'Authentication failed',
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const user = await this.authService.profile(req.user.id);
      return new ResponseData<User | string>(
        user,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  // @Post()
  // @UseFilters(HttpExceptionFilter)
  // async create(@Body() data: CreateUserDto) {
  //   console.log(data)
  //   throw new ForbiddenException();
  // }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post()
  async createPost(@Request() req, @Body() data: CreatePostDto) {
    try {
      const result = await this.postsService.createPost(data, req.user.sub);
      return new ResponseData<string>(
        result,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('posts')
  async getMyPosts(@Request() req) {
    try {
      const result = await this.postsService.getAllPost(req.user.sub);
      return new ResponseData<PostListDto[] | string>(
        result,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<PostListDto[] | string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('post/:id')
  async detailPost(@Request() req) {
    try {
      const result = await this.postsService.detailPost(req.user.sub);
      return new ResponseData<any | string>(
        result,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<any | string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post(":postId")
  async postComment(@Param('postId') postId: string,
    @Request() req, @Body() data: CommentCreateDto) {
    try {
      const result = await this.commentService.createComment(data, req.user.sub, postId);
      return new ResponseData<string>(
        result,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e: any) {
      return new ResponseData<string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
}
