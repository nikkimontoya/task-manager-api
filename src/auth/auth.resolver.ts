import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Login} from './models/login.model';
import {RegisterInput} from './models/register.input';
import {UserService} from '../user/user.service';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Query((returns) => Login)
    async login(@Args('email') email: string, @Args('password') password: string): Promise<Login> {
        const user = await this.userService.validateUser(email, password);
        return this.authService.login(user);
    }

    @Mutation((returns) => Login)
    async register(@Args('data', {type: () => RegisterInput}) data: RegisterInput): Promise<Login> {
        return this.authService.register(data);
    }
}
