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
      .leftJoinAndSelect('pos.specialties', 'spec');

    // Filtros
    if (query.category) {
      const catId = Number(query.category);
      if (!isNaN(catId)) {
        qb.andWhere('project.categoryId = :catId', { catId });
      }
    }
    if (query.subcategory) {
      const subId = Number(query.subcategory);
      if (!isNaN(subId)) {
        qb.andWhere('project.subcategoryId = :subId', { subId });
      }
    }
    if (query.industry) {
      // Si query.industry es nombre:
      qb.andWhere('ind.name = :indName', { indName: query.industry });
      // Si fuese ID: parsear y usar ind.id = :indId
    }
    if (query.minBudget != null) {
      qb.andWhere('project.budgetTotal >= :minB', { minB: query.minBudget });
    }
    if (query.maxBudget != null) {
      qb.andWhere('project.budgetTotal <= :maxB', { maxB: query.maxBudget });
    }
    if (query.skills && query.skills.length) {
      qb.andWhere('skill.name IN (:...skills)', { skills: query.skills });
    }
    if (query.specialties && query.specialties.length) {
      qb.andWhere('spec.name IN (:...specialties)', { specialties: query.specialties });
    }

    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      const dirUpper = (dir || 'asc').toUpperCase() as 'ASC' | 'DESC';
      // Asegúrate de que el campo sea válido para evitar inyección
      qb.orderBy(`project.${field}`, dirUpper);
    }

    // Paginación
    const page = query.page ?? 0;
    const limit = query.limit ?? 20;
    qb.skip(page * limit).take(limit);

    // Ejecutar consulta
    const [items, total] = await qb.getManyAndCount();

    // Calcular metadatos
    const lastPage = Math.max(0, Math.ceil(total / limit) - 1);

    const meta: PaginationMetaDto = {
      total,
      page,
      limit,
      lastPage,
    };

    // Opcional: si deseas incluir URLs de prev/next
    // Necesitarías conocer la URL base y los query params actuales.
    // Por ejemplo, si quisieras:
    // if (page > 0) meta.prevPageUrl = buildUrl(page - 1, limit, otros filtros);
    // if (page < lastPage) meta.nextPageUrl = buildUrl(page + 1, limit, otros filtros);
    // Pero aquí lo dejamos sin URLs o implementa según tu lógica de construcción de rutas.

    return { items, meta };
  }
}
