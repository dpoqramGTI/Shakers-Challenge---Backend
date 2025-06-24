import {
  Entity,
  PrimaryColumn,
  // PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity('skill')
export class Skill {
  // Si vas a usar seeds con IDs desde JSON:
  @PrimaryColumn()
  id: number;

  // Si prefieres ID auto:
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ unique: true })
  name: string;

  // Ya no hay relación ManyToMany con Project
  // Solo ManyToMany con Position:
  @ManyToMany(() => Position, position => position.skills)
  positions: Position[];
}
