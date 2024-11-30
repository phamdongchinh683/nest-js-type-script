import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from 'class-validator';
import { Role } from 'src/global/globalEnum';

export class AuthSignUp {
 @IsString()
 @IsNotEmpty()
 @MinLength(6, { message: 'Username must be at least 6 characters long.' })
 username: string;
 @IsString()
 @IsNotEmpty()
 @MinLength(6, { message: 'Password must be at least 6 characters long.' })
 password: string;
 @IsString()
 @IsNotEmpty()
 fullName: string;
 @IsInt()
 @Min(18, { message: 'Age must be at least 18.' })
 @Max(100, { message: 'Age must not exceed 100.' })
 age: number;
 @IsArray()
 @IsEnum(Role, { each: true, message: 'Roles must be valid admin or user values.' })
 roles: Role[];
}
