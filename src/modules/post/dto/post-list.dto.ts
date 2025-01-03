import { Post } from "src/entities/post.model";

export class PostListDto {
 id: string;
 title: string;
 votes: number;
 createdAt: Date;
 updatedAt: Date;

 constructor(post: Post) {
  this.id = post.id;
  this.title = post.title;
  this.votes = post.votes;
 }
}
