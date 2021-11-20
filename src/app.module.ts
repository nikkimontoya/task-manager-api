import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
