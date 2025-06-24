import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectLeadersService } from './project-leaders.service';

@Controller('project-leaders')
export class ProjectLeadersController {
  constructor(private readonly plService: ProjectLeadersService) {}

  @Get()
  findAll() {
    return this.plService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plService.remove(id);
  }
}
