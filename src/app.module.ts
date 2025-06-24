import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { IndustriesModule } from './modules/industries/industries.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SkillsModule } from './modules/skills/skills.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { ProjectLeadersModule } from './modules/project-leaders/project-leaders.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    IndustriesModule,
    SubcategoriesModule,
    ProjectLeadersModule,
    PositionsModule,
    OrganizationsModule,
    SkillsModule,
    SpecialtiesModule,
    ProjectsModule,
  ]
})
export class AppModule {}