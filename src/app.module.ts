import {join} from 'path';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TasksModule} from './tasks/tasks.module';
import {UserModule} from './user/user.module';
import {ProjectsModule} from './projects/projects.module';

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
                    synchronize: true
                };
            }
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql')
        }),
        AuthModule,
        TasksModule,
        UserModule,
        ProjectsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
