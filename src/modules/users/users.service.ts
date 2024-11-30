import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.model';
import { Repository } from 'typeorm/repository/Repository';
import { AuthLogin } from '../auth/dto/auth-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }
  async create(user: CreateUserDto): Promise<string> {
    this.usersRepository.save(user);
    return `created`;
  }
  async findAll(): Promise<User[] | string> {
    const users = await this.usersRepository.find();
    if (users.length === 0) {
      return 'Current users empty';
    }
    return users;
  }
  async update(id: string, user: UpdateUserDto): Promise<string> {
    this.usersRepository.update(id, user);
    return `Updated`;
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<string> {
    const user = await this.usersRepository.delete(id);
    if (user.affected === 0) {
      return `This user has been removed`;
    }
    return `deleted`;
  }
  async findByUsername(data: AuthLogin): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Username or password is incorrect');
    }
    return user;
  }

  async signUp(data: CreateUserDto): Promise<string> {
    const user = await this.usersRepository.save(data);
    if (!user) {
      return `this information exists`;
    }
    return 'success';
  }
}
