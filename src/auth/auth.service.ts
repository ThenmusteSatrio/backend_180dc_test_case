import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async register(dto: RegisterDto){
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email sudah ada');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
        });

        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });
        const { password, ...safeUser } = user;
        return {
            success: true,
            message: 'User registered successfully',
            data: {
                user: safeUser,
                access_token: token,
            },
        };
    }

    async login(dto: LoginDto) {
        const user =
            await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

        if (!user) {
            throw new UnauthorizedException(
                'Invalid token'
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                dto.password,
                user.password,
            );

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid token'
            );
        }

        const token =
            await this.jwtService.signAsync({
                user_id: user.id,
                email: user.email,
            });

        const { password, ...safeUser } = user;

        return {
            success: true,
            message: 'Login success',
            data: {
                user: safeUser,
                token,
            },
        };
    }

}