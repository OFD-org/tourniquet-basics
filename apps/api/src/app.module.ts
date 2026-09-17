import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PollModule } from "./poll/poll.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get<string>("POSTGRES_HOST"),
                port: configService.get<number>("POSTGRES_PORT"),
                username: configService.get<string>("POSTGRES_USER"),
                password: configService.get<string>("POSTGRES_PASSWORD"),
                database: configService.get<string>("POSTGRES_DB"),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        AuthModule,
        UsersModule,
        PollModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
