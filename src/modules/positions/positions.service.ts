import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { Project } from '../projects/entities/project.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Specialty } from '../specialties/entities/specialty.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly posRepo: Repository<Position>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,

    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
  ) {}

  async findAll(): Promise<Position[]> {
    return this.posRepo.find();
  }

  async findOne(id: number): Promise<Position> {
    const pos = await this.posRepo.findOne({ where: { id } });
    if (!pos) {
      throw new NotFoundException(`Position ${id} no encontrada`);
    }
    return pos;
  }

  async remove(id: number): Promise<void> {
    const pos = await this.findOne(id);
    await this.posRepo.remove(pos);
  }
}
