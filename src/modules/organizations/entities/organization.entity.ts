import {
  Entity,
  PrimaryColumn, // para permitir IDs fijos desde seed
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Industry } from '../../industries/entities/industry.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('organization')
export class Organization {
  @PrimaryColumn()    // si usas IDs fijos; o @PrimaryGeneratedColumn() si no usas seed ID explícito
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @ManyToOne(() => Industry, ind => ind.organizations, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'industryId' })
  industry: Industry;

  @Column({ nullable: true })
  industryId: number;

  @OneToMany(() => Project, proj => proj.organization)
  projects: Project[];
}
