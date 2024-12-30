import { Query, Resolver } from '@nestjs/graphql';
import { Pet } from 'src/entities/pet.model';
import { PetService } from 'src/modules/pet/pet.service';

@Resolver(() => Pet)
export class PetResolver {
 constructor(private readonly petService: PetService) { }
 @Query(() => [Pet])
 getPets() {
  return this.petService.getPets();
 }
}