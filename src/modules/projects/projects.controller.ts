// src/projects/projects.controller.ts
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { PaginatedResultDto, PaginationMetaDto } from './dtos/pagination.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  // Puedes usar @ApiOkResponse({ type: PaginatedResultDto }) si usas Swagger
  async findAll(
    @Query() query: ProjectQueryDto,
  ): Promise<PaginatedResultDto<Project>> {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.findById(id);
  }
}
