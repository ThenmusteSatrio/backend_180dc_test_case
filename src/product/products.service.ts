import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateProductDto, userId: string) {
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                ownerId: userId,
            },
        });

        return {
            success: true,
            message: 'Product created successfully',
            data: {
                id: product.id,
                name: product.name,
                price: product.price,
                owner_id: product.ownerId,
                created_at: product.created_at,
            },
        };
    }

    async findAll(query: GetProductsDto) {
        const {
        page = 1,
        limit = 10,
        search = '',
        sort_by = 'created_at',
        sort_order = 'desc',
        } = query;

        const skip = (page - 1) * limit;

        const total = await this.prisma.product.count({
            where: {
            name: {
                contains: search,
                mode: 'insensitive',
            },
            },
        });

        const products =
        await this.prisma.product.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            },

            orderBy: {[sort_by]: sort_order},
            skip,
            take: limit,
        });

        return {
            success: true,
            message: 'Products fetched successfully',
            data:    products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                owner_id: product.ownerId,
                created_at: product.created_at
            })),

            pagination: {
                page,
                limit,
                total,
                total_pages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundException(
            'Product not found',
            );
        }
        return {
            success: true,
            message: 'Product fetched successfully',
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                owner_id: product.ownerId,
                created_at: product.created_at,
            },
        };
    }

    async update(id: number, dto: UpdateProductDto, userId: string) {
        const existingProduct = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }

        if (existingProduct.ownerId !== userId) {
            throw new ForbiddenException('Forbidden');
        }

        const updatedProduct = await this.prisma.product.update({
            where: {
                id,
            },
            data: {
                ...(dto.name !== undefined && {
                    name: dto.name,
                }),

                ...(dto.description !== undefined && {
                    description: dto.description,
                }),

                ...(dto.price !== undefined && {
                    price: dto.price,
                }),
            },
        });

        return {
            success: true,
            message:'Product updated successfully',
            data: {
                id: updatedProduct.id,
                name: updatedProduct.name,
                description: updatedProduct.description,
                price: updatedProduct.price,
                owner_id: updatedProduct.ownerId,
                created_at: updatedProduct.created_at
            },
        };
    }

    async delete(id: number, userId: string) {
        const existingProduct = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }

        if (existingProduct.ownerId !== userId) {
            throw new ForbiddenException('Forbidden');
        }

        await this.prisma.product.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
            message: 'Product deleted successfully',
        };
    }
}