import { Role } from 'src/global/globalEnum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
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
}

