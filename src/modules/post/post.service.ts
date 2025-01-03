import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.model';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePostDto } from './dto/post-create.dto';
import { PostDetailDto } from './dto/post-detail.dto';

@Injectable()
export class PostService {

 constructor(
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>,
 ) { }

 async getPosts(): Promise<Post[]> {
  return this.postRepository.find();
 }

 async createPost(data: CreatePostDto, userId: string): Promise<string> {
  const newPost = this.postRepository.create({
   ...data,
   author: { id: userId },
  });
  this.postRepository.save(newPost);

  return "Created post"
 }


 async detailPost(
  @Param('id')
  id: string,
 ): Promise<PostDetailDto | string> {

  const post = await this.postRepository.findOneBy({ id });
  if (!post) {
   return 'Not found this post'
  }
  return post;
 }

}
