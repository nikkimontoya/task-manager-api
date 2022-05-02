import {Args, Query, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Login} from './models/login.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query((returns) => Login)
    async login(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.login(email, password);
    }
}
