import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectLeader } from './entities/project-leader.entity';
import { ProjectLeadersService } from './project-leaders.service';
import { ProjectLeadersController } from './project-leaders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectLeader])],
  providers: [ProjectLeadersService],
  controllers: [ProjectLeadersController],
  exports: [ProjectLeadersService],
})
export class ProjectLeadersModule {}
