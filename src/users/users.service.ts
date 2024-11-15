import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(user: User): string {
    this.users.push(user);
    return `Created`;
  }
  findAll(): User[] {
    return this.users;
  }
  getUserById(id: string): User | null {
    const userIndex = this.users.find((user) => user.id === id);
    return userIndex || null;
  }
  updateUserById(id: string, field: UpdateUserDto): User | string {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return `User not found`;
    }
    this.users[index] = { ...this.users[index], ...field };
    return this.users[index];
  }
  deleteById(id: string): string {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return `User not found in list`;
    } else {
      this.users.splice(userIndex, 1);
      return `User deleted`;
    }
  }
}
