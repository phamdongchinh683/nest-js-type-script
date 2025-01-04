import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/entities/user.model';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus, Role } from 'src/global/globalEnum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponsePayload } from './dto/user-response-payload.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) { }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  @Query(() => [User])
  async findAll(@Req() req: Request): Promise<ResponseData<User[] | string>> {
    console.log(req['example']);
    try {
      const users = await this.usersService.findAll();
      return new ResponseData<User[] | string>(
        users,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User[]>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseData<string>> {
    try {
      const message = await this.usersService.create(createUserDto);
      return new ResponseData<string>(
        message,
        httpStatus.SUCCESS,
        httpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<string>(
        e.message,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Get(':id')
  async findOneUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<UserResponsePayload>> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseData<User>(
      user,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<string>> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseData<string>(
      updatedUser,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }


  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<string>> {
    const result = await this.usersService.remove(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseData<string>(
      result,
      httpStatus.SUCCESS,
      httpMessage.SUCCESS,
    );
  }
}
