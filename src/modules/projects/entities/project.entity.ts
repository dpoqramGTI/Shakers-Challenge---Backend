import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { ProjectLeader } from '../../project-leaders/entities/project-leader.entity';
import { Position } from '../../positions/entities/position.entity';

@Entity('project')
export class Project {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Organization, org => org.projects, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;
  @Column()
  organizationId: number;

  @ManyToOne(() => ProjectLeader, pl => pl.projects, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projectLeaderId' })
  projectLeader: ProjectLeader;
  @Column()
  projectLeaderId: number;

  @ManyToOne(() => Category, cat => cat.projects, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @Column()
  categoryId: number;

  @ManyToOne(() => Subcategory, sub => sub.projects, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory?: Subcategory;

  @Column({ nullable: true })
  subcategoryId?: number;

  @Column({ type: 'int', nullable: true })
  totalHours: number;

  @Column({ type: 'int', nullable: true })
  budgetHourFrom: number;
  @Column({ type: 'int', nullable: true })
  budgetHourTo: number;
  @Column({ type: 'int', nullable: true })
  budgetTotal: number;

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  goals: string[];

  @Column({ type: 'jsonb', nullable: true })
  faqs: { question: string; answer: string }[];

  @OneToMany(() => Position, pos => pos.project, { cascade: true })
  positions: Position[];

  @Column({ type: 'int', default: 0 })
  totalApplicationsAmount: number;
}
