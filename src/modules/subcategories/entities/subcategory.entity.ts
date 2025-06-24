import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('subcategory')
export class Subcategory {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, cat => cat.subcategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  @OneToMany(() => Project, proj => proj.subcategory)
  projects: Project[];
}
