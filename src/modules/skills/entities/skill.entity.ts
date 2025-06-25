import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity('skill')
export class Skill {

  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Position, position => position.skills)
  positions: Position[];
}
