import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('project_leader')
export class ProjectLeader {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => Project, proj => proj.projectLeader)
  projects: Project[];
}
