import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Get(`:id`)
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
