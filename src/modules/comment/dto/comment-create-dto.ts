import { IsNotEmpty, IsString } from "class-validator";

export class CommentCreateDto {
 @IsNotEmpty()
 @IsString()
 content: string;
}