import {
  Entity,
  // Si vas a insertar IDs desde seed: usar PrimaryColumn
  // Si prefieres IDs auto-generados y no insertas explícitamente ID en seed, usa PrimaryGeneratedColumn
  PrimaryColumn,
  // PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity('specialty')
export class Specialty {
  // Usar PrimaryColumn si en seeds especificas el id:
  @PrimaryColumn()
  id: number;

  // Si prefieres que la BD genere IDs automáticamente, comenta la línea anterior y descomenta esta:
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ unique: true })
  name: string;

  // Ya no hay ManyToMany con Project (se eliminó relación en Project)
  // Solo ManyToMany con Position:
  @ManyToMany(() => Position, position => position.specialties)
  positions: Position[];
}
