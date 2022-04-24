import {Args, Int, Query, Resolver} from '@nestjs/graphql';
import {User} from './models/user.model';
import {UserService} from './user.service';

@Resolver((of: unknown) => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query((returns) => [User])
    async users(@Args('ids', {type: () => [Int], nullable: true}) ids?: number[]) {
        if (ids) {
            return this.userService.getByIds(ids);
        }

        return this.userService.getAll();
    }
}
