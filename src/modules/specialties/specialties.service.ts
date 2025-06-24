import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
  ) {}

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepo.find();
  }

  async findById(id: number): Promise<Specialty> {
    const s = await this.specialtyRepo.findOne({ where: { id } });
    if (!s) throw new BadRequestException('Specialty no encontrada');
    return s;
  }

}