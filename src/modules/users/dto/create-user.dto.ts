import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
