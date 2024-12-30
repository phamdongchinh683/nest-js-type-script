import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.model';
import { PostResolver } from 'src/graphql/resolvers/post.resolver';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver],
  exports: [TypeOrmModule, PostService],
})
export class PostModule { }
