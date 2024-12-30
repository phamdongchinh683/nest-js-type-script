import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
 @IsString()
 @IsNotEmpty()
 title: string;
 @IsNumber()
 @IsNotEmpty()
 votes?: number;
}
