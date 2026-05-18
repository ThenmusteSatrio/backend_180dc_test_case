import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { GetProductsDto } from './dto/get-product.dto';
import { ProductParamDto } from './dto/product-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateProductDto, @Req() req: any) {
        return this.productsService.create(dto, req.user.user_id);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() query: GetProductsDto) {
      return this.productsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    findOne(@Param() param: ProductParamDto) {
        return this.productsService.findOne(param.id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    update(@Param() param: ProductParamDto, @Body() dto: UpdateProductDto, @Req() req: any) {
        return this.productsService.update(param.id, dto, req.user.user_id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    delete(@Param() param: ProductParamDto, @Req() req: any) {
        return this.productsService.delete(
            param.id,
            req.user.user_id,
        );
    }
}