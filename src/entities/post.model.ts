
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
 @CreateDateColumn()
 createdAt: Date;

 @UpdateDateColumn()
 updatedAt: Date;
}
