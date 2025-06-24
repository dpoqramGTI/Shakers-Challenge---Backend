import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';

@Entity('position')
export class Position {
  @PrimaryColumn()  // si seed asigna IDs fijos
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Project, proj => proj.positions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  projectId: number;

  @ManyToMany(() => Skill, skill => skill.positions)
  @JoinTable({
    name: 'position_skills',
    joinColumn: { name: 'positionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skillId', referencedColumnName: 'id' },
  })
  skills: Skill[];

  @ManyToMany(() => Specialty, spec => spec.positions)
  @JoinTable({
    name: 'position_specialties',
    joinColumn: { name: 'positionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialtyId', referencedColumnName: 'id' },
  })
  specialties: Specialty[];

  @Column({ type: 'int', nullable: true })
  referralBonus: number;
}
