import { IsOptional, IsString, IsNumber, Min, Max, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value !== undefined) return [Number(value)];
    return [];
  })
  categories?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value !== undefined) return [Number(value)];
    return [];
  })
  skills?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value !== undefined) return [Number(value)];
    return [];
  })
  specialties?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value !== undefined) return [Number(value)];
    return [];
  })
  industries?: number[];
}
