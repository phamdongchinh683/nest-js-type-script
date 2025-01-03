import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/global/globalEnum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from './comment.model';
import { Post } from './post.model';
@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    unique: true
  }) username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  roles: Role[];
  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author, { onDelete: 'CASCADE' })
  comments: Comment[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
