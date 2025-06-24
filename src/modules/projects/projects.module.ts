import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity'
import { Position } from '../positions/entities/position.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Specialty } from '../specialties/entities/specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Position, Organization, Skill, Specialty]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}