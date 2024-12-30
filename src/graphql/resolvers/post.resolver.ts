import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/entities/post.model';
import { PostService } from 'src/modules/post/post.service';

@Resolver(() => Post)
export class PostResolver {
 constructor(private readonly postService: PostService) { }
 @Query(() => [Post])
 getPosts() {
  return this.postService.getPosts();
 }


 @Mutation(() => Post)
 post(@Args('id') id: string) {
  return this.postService.detailPost(id);
 }

}