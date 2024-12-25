import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.model';
import { UserResolver } from 'src/graphql/resolvers/user.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule { }
