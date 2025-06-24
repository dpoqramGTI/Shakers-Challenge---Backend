import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('category')
export class Category {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, sub => sub.category)
  subcategories: Subcategory[];

  @OneToMany(() => Project, proj => proj.category)
  projects: Project[];
}
