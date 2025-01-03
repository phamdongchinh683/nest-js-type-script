import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.model';
import { Repository } from 'typeorm';
import { CommentCreateDto } from './dto/comment-create-dto';

@Injectable()
export class CommentService {
 constructor(
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>,
 ) { }
 async createComment(data: CommentCreateDto, userId: string, postId: string): Promise<string> {

  const comment = this.commentRepository.create({
   ...data,
   author: { id: userId },
   post: { id: postId },
  })
  this.commentRepository.save(comment);
  return "success"
 }
}
