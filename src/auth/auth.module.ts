import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtSrategy } from "./jwt.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
        PrismaModule
    ],
    providers: [AuthService, JwtSrategy],
    controllers: [AuthController]
})

export class AuthModule{}