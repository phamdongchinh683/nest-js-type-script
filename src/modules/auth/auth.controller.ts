import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/entities/user.model';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus, Role } from 'src/global/globalEnum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthLogin } from './dto/auth-login.dto';
import { AuthSignUp } from './dto/auth-signup.dto';
import { JwtResponse } from './dto/jwt-response.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }
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
        e.message || 'Authentication failed',
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
}
