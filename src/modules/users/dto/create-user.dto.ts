import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Role } from 'src/global/globalEnum';

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
  @IsArray()
  @IsEnum(Role, { each: true, message: 'Roles must be valid admin or user values.' })
  roles: Role[];
}
