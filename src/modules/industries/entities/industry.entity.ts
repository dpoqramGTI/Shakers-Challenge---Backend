import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('industry')
export class Industry {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Organization, org => org.industry)
  organizations: Organization[];
}
