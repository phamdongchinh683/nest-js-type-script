import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthLogin } from './dto/auth-login.dto';
import { JwtResponse } from './dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(data: AuthLogin): Promise<JwtResponse> {
    const user = await this.userService.findByUsername(data);
    const payload = { sub: user.id, username: user.username };
    console.log('JwtService Debug:', this.jwtService);
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
