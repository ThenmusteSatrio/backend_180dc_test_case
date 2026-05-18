import {IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1, {
    message:
      'price must be greater than 0',
  })
  price?: number;
}