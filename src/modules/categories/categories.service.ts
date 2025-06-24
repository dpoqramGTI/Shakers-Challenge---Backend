import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const cat = await this.categoryRepo.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Category ${id} no encontrada`);
    }
    return cat;
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await this.categoryRepo.remove(cat);
  }
}
