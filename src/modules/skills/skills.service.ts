import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillRepo.find();
  }

  async findById(id: number): Promise<Skill> {
    const s = await this.skillRepo.findOne({ where: { id } });
    if (!s) throw new BadRequestException('Skill no encontrada');
    return s;
  }

}