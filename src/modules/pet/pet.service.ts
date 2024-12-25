import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/entities/pet.model';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PetService {
 constructor(
  @InjectRepository(Pet)
  private readonly petRepository: Repository<Pet>,
 ) { }

 private pets: Pet[] = [
  { id: '1', name: 'Max' },
  { id: '2', name: 'Bella' },
 ];

 async getPets(): Promise<Pet[]> {
  return this.petRepository.find();
 }
}
