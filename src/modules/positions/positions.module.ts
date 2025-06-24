import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { Project } from '../projects/entities/project.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Specialty } from '../specialties/entities/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Project, Skill, Specialty])],
  providers: [PositionsService],
  controllers: [PositionsController],
  exports: [PositionsService],
})
export class PositionsModule {}
