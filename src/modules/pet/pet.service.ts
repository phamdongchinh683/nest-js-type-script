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

 async getPets(): Promise<Pet[]> {
  return this.petRepository.find();
 }
}
