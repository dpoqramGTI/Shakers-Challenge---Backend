// src/projects/dtos/pagination.dto.ts

import { ApiProperty } from '@nestjs/swagger'; // si usas Swagger
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Número total de ítems disponibles' })
  @IsNumber()
  @Type(() => Number)
  total: number;

  @ApiProperty({ description: 'Página actual (0-based)' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  page: number;

  @ApiProperty({ description: 'Límite de ítems por página' })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: 'Índice de la última página (0-based)' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  lastPage: number;

  @ApiProperty({ description: 'URL de la página anterior, si existe', required: false })
  prevPageUrl?: string;

  @ApiProperty({ description: 'URL de la página siguiente, si existe', required: false })
  nextPageUrl?: string;
}

export class PaginatedResultDto<T> {
  @ApiProperty({ description: 'Items de la página actual', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Metadatos de paginación' })
  meta: PaginationMetaDto;
}
