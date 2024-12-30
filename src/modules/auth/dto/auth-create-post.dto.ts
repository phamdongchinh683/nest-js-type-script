import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCreatePost {
 @IsString()
 @IsNotEmpty()
 @MinLength(20, { message: 'title must be at least 20 characters long.' })
 title: string;
}
