import {Injectable} from '@nestjs/common';
import {LoginResponseDto} from './dto/login-response.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(email: string): Promise<LoginResponseDto> {
        const payload = {email};

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
