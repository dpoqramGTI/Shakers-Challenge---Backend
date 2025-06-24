import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRepo.find();
  }

  async findOne(id: number): Promise<Subcategory> {
    const sub = await this.subcategoryRepo.findOne({ where: { id } });
    if (!sub) {
      throw new NotFoundException(`Subcategory ${id} no encontrada`);
    }
    return sub;
  }

  async remove(id: number): Promise<void> {
    const sub = await this.findOne(id);
    await this.subcategoryRepo.remove(sub);
  }
}
