// src/projects/projects.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { PaginatedResultDto, PaginationMetaDto } from './dtos/pagination.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findById(id: number): Promise<Project> {
    const proj = await this.projectRepo.findOne({
      where: { id },
      relations: [
        'organization',
        'organization.industry',
        'projectLeader',
        'category',
        'subcategory',
        'positions',
        'positions.skills',
        'positions.specialties',
      ],
    });
    if (!proj) throw new BadRequestException('Proyecto no encontrado');
    return proj;
  }

  /**
   * Retorna items y metadatos de paginación.
   */
  async findAll(query: ProjectQueryDto): Promise<PaginatedResultDto<Project>> {
    const qb = this.projectRepo.createQueryBuilder('project')
      .leftJoinAndSelect('project.organization', 'org')
      .leftJoinAndSelect('org.industry', 'ind')
      .leftJoinAndSelect('project.category', 'category')
      .leftJoinAndSelect('project.subcategory', 'subcategory')
      .leftJoinAndSelect('project.projectLeader', 'pl')
      .leftJoinAndSelect('project.positions', 'pos')
      .leftJoinAndSelect('pos.skills', 'skill')
      .leftJoinAndSelect('pos.specialties', 'spec')
      .distinct(true);

    if (query.categories && query.categories.length) {
      qb.andWhere('project.categoryId IN (:...catIds)', { catIds: query.categories });
    }

    if (query.subcategory) {
      const subId = Number(query.subcategory);
      if (!isNaN(subId)) {
        qb.andWhere('project.subcategoryId = :subId', { subId });
      }
    }

    // Filtrado por industrias (IDs)
    if (query.industries && query.industries.length) {
      qb.andWhere('ind.id IN (:...industryIds)', { industryIds: query.industries });
    }

    if (query.industry) {
      // opción adicional si deseas filtrar por nombre de industria
      qb.andWhere('ind.name = :indName', { indName: query.industry });
    }

    if (query.minBudget != null) {
      qb.andWhere('project.budgetTotal >= :minB', { minB: query.minBudget });
    }

    if (query.maxBudget != null) {
      qb.andWhere('project.budgetTotal <= :maxB', { maxB: query.maxBudget });
    }

    // Filtro por skills usando subquery con INNER JOIN
    if (query.skills && query.skills.length) {
      qb.andWhere(qb2 => {
        const projectAlias = qb.alias; // 'project'
        const sub = qb2.subQuery()
          .select('1')
          .from('position', 'pos2')
          .innerJoin('pos2.skills', 'skill2')
          .where(`pos2.projectId = ${projectAlias}.id`)
          .andWhere('skill2.id IN (:...skills)')
          .getQuery();
        return `EXISTS ${sub}`;
      }, { skills: query.skills });
    }

    // Filtro por specialties usando subquery con INNER JOIN
    if (query.specialties && query.specialties.length) {
      qb.andWhere(qb2 => {
        const projectAlias = qb.alias;
        const sub = qb2.subQuery()
          .select('1')
          .from('position', 'pos3')
          .innerJoin('pos3.specialties', 'spec2')
          .where(`pos3.projectId = ${projectAlias}.id`)
          .andWhere('spec2.id IN (:...specialties)')
          .getQuery();
        return `EXISTS ${sub}`;
      }, { specialties: query.specialties });
    }

    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      const dirUpper = (dir || 'asc').toUpperCase() as 'ASC' | 'DESC';
      qb.orderBy(`project.${field}`, dirUpper);
    }

    // Paginación
    const page = query.page ?? 0;
    const limit = query.limit ?? 20;
    qb.skip(page * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();

    const lastPage = Math.max(0, Math.ceil(total / limit) - 1);

    const meta: PaginationMetaDto = {
      total,
      page,
      limit,
      lastPage,
    };

    return { items, meta };
  }
}
