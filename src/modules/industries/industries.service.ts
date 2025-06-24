import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private readonly industryRepo: Repository<Industry>,
  ) {}

  async findAll(): Promise<Industry[]> {
    return this.industryRepo.find();
  }

  async findOne(id: number): Promise<Industry> {
    const ind = await this.industryRepo.findOne({ where: { id } });
    if (!ind) {
      throw new NotFoundException(`Industry ${id} no encontrada`);
    }
    return ind;
  }

  async remove(id: number): Promise<void> {
    const ind = await this.findOne(id);
    await this.industryRepo.remove(ind);
  }
}
