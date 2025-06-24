// src/projects/dtos/project-query.dto.ts
import { IsOptional, IsString, IsNumber, Min, Max, IsArray } from 'class-validator'; 
import { Type } from 'class-transformer';

export class ProjectQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sort?: string; // formato: campo:asc|desc

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBudget?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBudget?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];
}
