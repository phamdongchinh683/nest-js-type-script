import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/entities/user.model';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  async findAll(): Promise<ResponseData<User[]>> {
    try {
      const users = this.usersService.findAll();
      return new ResponseData<User[]>(
        users,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User[]>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<ResponseData<string>> {
    try {
      const message = this.usersService.create(createUserDto);
      return new ResponseData<string>(
        message,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<User>> {
    const updatedUser = this.usersService.updateUserById(id, updateUserDto);
    if (typeof updatedUser === 'string') {
      throw new NotFoundException(updatedUser);
    }
    return new ResponseData<User>(
      updatedUser,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<ResponseData<User>> {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseData<User>(
      user,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<ResponseData<string>> {
    const result = this.usersService.deleteById(id);
    if (result === 'User not found in list') {
      throw new NotFoundException(result);
    }
    return new ResponseData<string>(
      result,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }
}
