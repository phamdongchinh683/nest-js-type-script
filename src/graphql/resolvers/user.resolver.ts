import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.model';
import { UsersService } from 'src/providers/app.provider';

@Resolver(() => User)
export class UserResolver {
 constructor(private readonly usersService: UsersService) { }
 @Query(() => [User])
 getUsers() {
  return this.usersService.findAll();
 }

}