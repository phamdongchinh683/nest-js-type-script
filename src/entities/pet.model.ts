import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('pets')
export class Pet {
 @Field()
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Field({ nullable: true })
 @Column({ nullable: true })
 name?: string;
}
