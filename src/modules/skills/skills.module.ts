import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillsService],
  controllers: [SkillsController],
  exports: [TypeOrmModule],
})
export class SkillsModule {}