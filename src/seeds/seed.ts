// src/seeds/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource, DeepPartial } from 'typeorm';

import categoriesData from './categories.json';
import industriesData from './industries.json';
import skillsData from './skills.json';
import specialtiesData from './specialties.json';
// subcategoriesData ya no se usa para proyectos, pero mantiene el seed si quieres poblar la tabla:
import subcategoriesData from './subcategories.json';
import projectsData from './projectsData.json';

import { Category } from '../modules/categories/entities/category.entity';
import { Industry } from '../modules/industries/entities/industry.entity';
import { Skill } from '../modules/skills/entities/skill.entity';
import { Specialty } from '../modules/specialties/entities/specialty.entity';
import { Subcategory } from '../modules/subcategories/entities/subcategory.entity';
import { Organization } from '../modules/organizations/entities/organization.entity';
import { ProjectLeader } from '../modules/project-leaders/entities/project-leader.entity';
import { Project } from '../modules/projects/entities/project.entity';
import { Position } from '../modules/positions/entities/position.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('🔄 Starting seeding...');

  // 1. Seed Categories
  const categoryRepo = dataSource.getRepository(Category);
  for (const item of categoriesData) {
    const exists = await categoryRepo.findOneBy({ id: item.id });
    if (!exists) {
      const cat = categoryRepo.create({
        id: item.id,
        name: item.name,
      });
      await categoryRepo.save(cat);
      console.log(`  • Category inserted: ${item.id} - ${item.name}`);
    }
  }
  console.log(`  → Total categories: ${await categoryRepo.count()}`);

  // 2. Seed Industries
  const industryRepo = dataSource.getRepository(Industry);
  for (const item of industriesData) {
    const exists = await industryRepo.findOneBy({ id: item.id });
    if (!exists) {
      const ind = industryRepo.create({
        id: item.id,
        name: item.name,
      });
      await industryRepo.save(ind);
      console.log(`  • Industry inserted: ${item.id} - ${item.name}`);
    }
  }
  console.log(`  → Total industries: ${await industryRepo.count()}`);

  // 3. Seed Skills
  const skillRepo = dataSource.getRepository(Skill);
  for (const item of skillsData) {
    const exists = await skillRepo.findOneBy({ id: item.id });
    if (!exists) {
      const sk = skillRepo.create({
        id: item.id,
        name: item.name,
      });
      await skillRepo.save(sk);
      console.log(`  • Skill inserted: ${item.id} - ${item.name}`);
    }
  }
  console.log(`  → Total skills: ${await skillRepo.count()}`);

  // 4. Seed Specialties
  const specialtyRepo = dataSource.getRepository(Specialty);
  for (const item of specialtiesData) {
    const exists = await specialtyRepo.findOneBy({ id: item.id });
    if (!exists) {
      const sp = specialtyRepo.create({
        id: item.id,
        name: item.name,
      });
      await specialtyRepo.save(sp);
      console.log(`  • Specialty inserted: ${item.id} - ${item.name}`);
    }
  }
  console.log(`  → Total specialties: ${await specialtyRepo.count()}`);

  // 5. Seed Subcategories (solo para poblar la tabla, pero luego no se usa en proyectos)
  const subcategoryRepo = dataSource.getRepository(Subcategory);
  for (const item of subcategoriesData) {
    const exists = await subcategoryRepo.findOneBy({ id: item.id });
    if (!exists) {
      // se comprueba categoría existente
      const cat = await categoryRepo.findOneBy({ id: item.categoryId });
      if (!cat) {
        console.warn(`    ! La categoryId ${item.categoryId} para subcategory ${item.id} no existe.`);
        continue;
      }
      const sc = subcategoryRepo.create({
        id: item.id,
        name: item.name,
        category: cat,
        categoryId: item.categoryId,
      });
      await subcategoryRepo.save(sc);
      console.log(`  • Subcategory inserted: ${item.id} - ${item.name}`);
    }
  }
  console.log(`  → Total subcategories: ${await subcategoryRepo.count()}`);

  // 6. Seed Organizations
  const orgRepo = dataSource.getRepository(Organization);
  for (const proj of projectsData) {
    const o = proj.organization;
    const exists = await orgRepo.findOneBy({ id: o.id });
    if (!exists) {
      const ind = await industryRepo.findOneBy({ id: o.industry });
      if (!ind) {
        console.warn(`    ! Industry ${o.industry} for Organization ${o.id} not found.`);
        continue;
      }
      const org = orgRepo.create({
        id: o.id,
        name: o.name,
        logo: o.logo,
        industry: ind,
        industryId: ind.id,
      });
      await orgRepo.save(org);
      console.log(`  • Organization inserted: ${o.id} - ${o.name}`);
    }
  }
  console.log(`  → Total organizations: ${await orgRepo.count()}`);

  // 7. Seed ProjectLeaders
  const plRepo = dataSource.getRepository(ProjectLeader);
  for (const proj of projectsData) {
    const pl = proj.projectLeader;
    const exists = await plRepo.findOneBy({ id: pl.id });
    if (!exists) {
      const leader = plRepo.create({
        id: pl.id,
        name: pl.name,
        lastName: pl.lastName,
      });
      await plRepo.save(leader);
      console.log(`  • ProjectLeader inserted: ${pl.id} - ${pl.name} ${pl.lastName}`);
    }
  }
  console.log(`  → Total project leaders: ${await plRepo.count()}`);

  // 8. Seed Projects (ignorando subcategory)
  const projRepo = dataSource.getRepository(Project);
  const posRepo = dataSource.getRepository(Position);

  // Prepara lista de categorías existentes para advertir si el proyecto usa category no existente
  const existingCatIds = new Set((await categoryRepo.find()).map(c => c.id));
  // Omitimos subcategories: no comprobamos ni asignamos

  for (const proj of projectsData) {
    let existsProj = await projRepo.findOneBy({ id: proj.id });
    if (!existsProj) {
      const org = await orgRepo.findOneBy({ id: proj.organization.id });
      const pl = await plRepo.findOneBy({ id: proj.projectLeader.id });
      const cat = await categoryRepo.findOneBy({ id: proj.category });
      // No comprobamos subcategory:
      if (!org || !pl || !cat) {
        console.warn(`    ! Referencia faltante en project ${proj.id}:`, {
          org: !!org,
          pl: !!pl,
          cat: !!cat,
          // sub ignorado
        });
        continue;
      }

      const newProjData: DeepPartial<Project> = {
        id: proj.id,
        title: proj.title,
        description: proj.description,
        organization: org,
        organizationId: org.id,
        projectLeader: pl,
        projectLeaderId: pl.id,
        category: cat,
        categoryId: cat.id,
        // Omitir subcategory:
        // subcategory: undefined,
        // subcategoryId: undefined,
        startDate: proj.startDate ? new Date(proj.startDate) : undefined,
        creationDate: proj.creationDate ? new Date(proj.creationDate) : undefined,
        publishedAt: proj.publishedAt ? new Date(proj.publishedAt) : undefined,
        totalHours: proj.totalHours ?? undefined,
        budgetHourFrom: proj.budget.hourFrom ?? undefined,
        budgetHourTo: proj.budget.hourTo ?? undefined,
        budgetTotal: proj.budget.total ?? undefined,
        totalApplicationsAmount: proj.totalApplicationsAmount ?? 0,
        status: proj.status ?? undefined,
        goals: Array.isArray(proj.goals) ? proj.goals : [],
        faqs: Array.isArray(proj.faqs) ? proj.faqs : [],
      };

      const newProj = projRepo.create(newProjData);
      existsProj = await projRepo.save(newProj);
      console.log(`  • Project inserted: ${proj.id} - ${proj.title}`);
    }

    // 9. Seed Positions para este proyecto
    const projectEntity = existsProj;
    for (const pos of proj.positions || []) {
      let existsPos = await posRepo.findOne({ where: { id: pos.id } });
      if (!existsPos) {
        const skillEntities: Skill[] = [];
        for (const skillId of pos.skills) {
          const sk = await skillRepo.findOneBy({ id: skillId });
          if (sk) skillEntities.push(sk);
          else console.warn(`    ! Skill ${skillId} not found for position ${pos.id}`);
        }
        const specEntities: Specialty[] = [];
        for (const specId of pos.specialties) {
          const sp = await specialtyRepo.findOneBy({ id: specId });
          if (sp) specEntities.push(sp);
          else console.warn(`    ! Specialty ${specId} not found for position ${pos.id}`);
        }
        const newPos = posRepo.create({
          id: pos.id,
          title: pos.title,
          project: projectEntity,
          projectId: projectEntity.id,
          skills: skillEntities,
          specialties: specEntities,
          referralBonus: pos.referralBonus ?? undefined,
        });
        await posRepo.save(newPos);
        console.log(`    • Position inserted: ${pos.id} - ${pos.title}`);
      }
    }
  }
  console.log('✅ Seeding completed!');

  // Opcional: mostrar conteo final para verificar inserción
  console.log(`  → Projects in DB: ${await projRepo.count()}`);
  console.log(`  → Positions in DB: ${await posRepo.count()}`);

  await app.close();
}

bootstrap().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
