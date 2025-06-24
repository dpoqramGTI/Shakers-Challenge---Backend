import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  providers: [SpecialtiesService],
  controllers: [SpecialtiesController],
  exports: [TypeOrmModule],
})
export class SpecialtiesModule {}