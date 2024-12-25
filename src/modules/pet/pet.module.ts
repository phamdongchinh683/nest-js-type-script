import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entities/pet.model';
import { PetResolver } from 'src/graphql/resolvers/pet.resolver';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
  ],
  controllers: [PetController],
  providers: [PetService, PetResolver],
  exports: [TypeOrmModule, PetService],
})
export class PetModule { }
