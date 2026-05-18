import {IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
import { Type } from 'class-transformer';
export class GetProductsDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string = '';

  @IsOptional()
  @IsIn([
    'name',
    'price',
    'created_at',
  ])
  sort_by?: string = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order?: 'asc' | 'desc' = 'desc';
}