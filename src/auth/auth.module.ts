import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserModule} from '../user/user.module';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';

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
    providers: [JwtStrategy, AuthService, AuthResolver]
})
export class AuthModule {}
