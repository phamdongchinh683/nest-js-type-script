import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.model';
import { UserResolver } from 'src/graphql/resolvers/user.resolver';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule { }
