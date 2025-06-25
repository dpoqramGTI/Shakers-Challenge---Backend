import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity('specialty')
export class Specialty {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Position, position => position.specialties)
  positions: Position[];
}
