import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Pet } from 'src/entities/pet.model';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
 constructor(private readonly petService: PetService) { }
 @Get()
 @Query(() => [Pet])
 getPets() {
  return this.petService.getPets();
 }
}
