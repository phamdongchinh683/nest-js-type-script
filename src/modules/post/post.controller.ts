import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
import { CreatePostDto } from './dto/post-create.dto';
import { PostDetailDto } from './dto/post-detail.dto';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {

 constructor(private readonly postService: PostService) { }
 @Get()
 @Query(() => [Post])
 getPets() {
  return this.postService.getPosts();
 }

 @Post()
 @UsePipes(new ValidationPipe({ transform: true }))
 async create(
  @Body() data: CreatePostDto,
 ): Promise<ResponseData<string>> {
  try {
   const message = await this.postService.createPost(data);
   return new ResponseData<string>(
    message,
    httpStatus.SUCCESS,
    httpMessage.SUCCESS,
   );
  } catch (e) {
   return new ResponseData<string>(
    e.message,
    httpStatus.ERROR,
    httpMessage.ERROR,
   );
  }
 }

 @Get(':id')
 async findPostById(@Param('id')
 id: string): Promise<ResponseData<PostDetailDto | string>> {
  try {
   const result = await this.postService.detailPost(id);
   return new ResponseData<PostDetailDto | string>(
    result,
    httpStatus.SUCCESS,
    httpMessage.SUCCESS,
   );
  } catch (e) {
   return new ResponseData<PostDetailDto>(
    e.message,
    httpStatus.ERROR,
    httpMessage.ERROR,
   );
  }
 }

}