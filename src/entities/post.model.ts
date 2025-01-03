
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from './comment.model';
import { User } from './user.model';

@ObjectType()
@Entity('posts')
export class Post {
 @Field()
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Field()
 @Column()
 title: string;

 @Field({ nullable: true })
 @Column()
 votes?: number;

 @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
 author: User;
 @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
 comments: Comment[];
 @CreateDateColumn()
 createdAt: Date;

 @UpdateDateColumn()
 updatedAt: Date;
}
