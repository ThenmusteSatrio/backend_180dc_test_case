import {IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({
        message: 'name is required',
    })
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(1, {
        message: 'price must be greater than 0',
    })
    price: number;
}