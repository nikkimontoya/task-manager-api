import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Task} from './models/task.model';
import {TasksService} from './tasks.service';
import {UserService} from '../user/user.service';
import {TaskInterface} from './types/task.interface';
import {User} from '../user/entities/user.entity';

@Resolver((of: unknown) => Task)
export class TaskResolver {
    constructor(private taskService: TasksService, private userService: UserService) {}

    @Query((returns) => [Task])
    async tasks() {
        return this.taskService.getAll();
    }

    @ResolveField()
    async author(@Parent() task: TaskInterface): Promise<User | undefined> {
        return this.userService.getById(task.authorId);
    }

    @ResolveField()
    async executor(@Parent() task: TaskInterface): Promise<User | undefined> {
        return this.userService.getById(task.executorId);
    }
}
