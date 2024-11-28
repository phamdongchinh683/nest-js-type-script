import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthLogin } from './dto/auth-login.dto';
import { JwtResponse } from './dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async signIn(data: AuthLogin): Promise<JwtResponse> {
    const user = await this.userService.findByUsername(data);
    const payload = { sub: user.id, username: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(data: CreateUserDto): Promise<string> {
    const result = await this.userService.signUp(data);
    if (result) {
      return 'success';
    }
    return 'error';
  }
}
