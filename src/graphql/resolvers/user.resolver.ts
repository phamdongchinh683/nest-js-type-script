import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.model';
import { UserService } from 'src/providers/app.provider';

@Resolver(() => User)
export class UserResolver {
 constructor(private readonly usersService: UserService) { }
 @Query(() => [User])
 getUsers() {
  return this.usersService.findAll();
 }

}