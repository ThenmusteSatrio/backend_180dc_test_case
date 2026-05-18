import {IsInt, Min} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductParamDto {
  @Type(() => Number)
  @IsInt({
    message:
      'Product id must be integer',
  })

  @Min(1)
  id: number;
}