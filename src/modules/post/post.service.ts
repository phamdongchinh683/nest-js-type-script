import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.model';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePostDto } from './dto/post-create.dto';
import { PostListDto } from './dto/post-list.dto';

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
 ): Promise<Post | string> {

  const post = await this.postRepository.findOne({
   relations: ['author', 'comments', 'comments.author'],
   where: { author: { id: id } }
  });

  if (!post) {
   return 'Not found this post'
  }
  return post;
 }

 async getAllPost(
  id: string,
 ): Promise<PostListDto[] | string> {
  const posts = await this.postRepository.find({
   where: { author: { id: id } },
  });
  if (!posts || posts.length === 0) {
   return 'Not found this posts'
  }
  return posts.map(post => new PostListDto(post));
 }
}
