import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {User} from './entities/user.entity';
import {AuthDto} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() body: AuthDto): Promise<User> {
        const user = await this.authService.findUser(body.username);

        // If a user with such a name already exists
        if (user) {
            throw new BadRequestException(
                'A user with such a name already exists',
            );
        }

        return this.authService.createUser(body);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() body: AuthDto): Promise<User> {
        const username = await this.authService.validateUser(body.username, body.password);

    }
}
