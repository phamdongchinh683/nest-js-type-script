import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/common/utils/hash.utils';
import { User } from 'src/entities/user.model';
import { Repository } from 'typeorm/repository/Repository';
import { AuthLogin } from '../auth/dto/auth-login.dto';
import { AuthRole } from '../auth/dto/auth-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponsePayload } from './dto/user-response-payload.dto';

@Injectable()
export class UserService {
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
  async findByUsername(data: AuthLogin): Promise<UserResponsePayload> {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    const compare = await comparePassword(data.password, user.password);
    if (!user || !compare) {
      throw new UnauthorizedException('Username or password is incorrect');
    }
    return user;
  }

  async findUserRole(username: string): Promise<AuthRole | string> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    })
    if (!user || user.roles.length === 0) {
      return `Username is incorrect`;
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
