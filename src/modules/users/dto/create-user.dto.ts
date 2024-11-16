import { IsNumberString } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  id: string;
  username: string;
  password: string;
  fullName: string;
  age: number;
}
