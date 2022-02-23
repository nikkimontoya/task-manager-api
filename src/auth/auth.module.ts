import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserModule} from '../user/user.module';
import {AuthService} from './auth.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET')
                };
            }
        }),
        PassportModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService]
})
export class AuthModule {}
