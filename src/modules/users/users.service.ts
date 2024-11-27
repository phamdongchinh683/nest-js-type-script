import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.model';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usersRepository.find();
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
}
