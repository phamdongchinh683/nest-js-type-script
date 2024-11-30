import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
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
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
