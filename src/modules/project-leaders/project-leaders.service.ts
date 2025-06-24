import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectLeader } from './entities/project-leader.entity';

@Injectable()
export class ProjectLeadersService {
  constructor(
    @InjectRepository(ProjectLeader)
    private readonly plRepo: Repository<ProjectLeader>,
  ) {}

  async findAll(): Promise<ProjectLeader[]> {
    return this.plRepo.find();
  }

  async findOne(id: number): Promise<ProjectLeader> {
    const pl = await this.plRepo.findOne({ where: { id } });
    if (!pl) {
      throw new NotFoundException(`ProjectLeader ${id} no encontrado`);
    }
    return pl;
  }

  async remove(id: number): Promise<void> {
    const pl = await this.findOne(id);
    await this.plRepo.remove(pl);
  }
}
