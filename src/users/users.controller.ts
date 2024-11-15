import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): User | string {
    return this.usersService.updateUserById(id, updateUserDto);
  }
  @Get(`:id`)
  findOneUser(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    return this.usersService.deleteById(id);
  }
}
