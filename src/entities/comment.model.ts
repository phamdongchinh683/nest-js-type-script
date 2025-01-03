import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.model';
import { User } from './user.model';


@ObjectType()
@Entity('comments')
export class Comment {
 @Field()
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Field()
 @Column()
 content: string;

 @Field(() => User)
 @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
 author: User;

 @Field(() => Post)
 @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
 post: Post;

 @Field()
 @CreateDateColumn()
 createdAt: Date;

 @Field()
 @UpdateDateColumn()
 updatedAt: Date;
}
