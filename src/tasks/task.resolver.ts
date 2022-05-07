import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Task} from './models/task.model';
import {TasksService} from './tasks.service';
import {UserService} from '../user/user.service';
import {TaskInterface} from './types/task.interface';
import {User} from '../user/entities/user.entity';
import {TaskInput} from './models/task.input';
import {ProjectsService} from '../projects/projects.service';
import {Project} from '../projects/entities/project.entity';

@Resolver((of: unknown) => Task)
export class TaskResolver {
    constructor(
        private taskService: TasksService,
        private userService: UserService,
        private projectsService: ProjectsService
    ) {}

    @Query((returns) => [Task])
    async tasks(@Args('ids', {type: () => [ID], nullable: true}) ids?: number[]) {
        if (ids) {
            return this.taskService.getByIds(ids);
        }

        return this.taskService.getAll();
    }

    @Mutation((returns) => Task)
    async addTask(@Args('task', {type: () => TaskInput}) task: TaskInput): Promise<TaskInterface> {
        return this.taskService.create(task);
    }

    @Mutation((returns) => Task)
    async editTask(
        @Args('id', {type: () => ID}) id: string,
        @Args('task', {type: () => TaskInput}) task: TaskInput
    ): Promise<TaskInterface> {
        return this.taskService.update(parseInt(id, 10), task);
    }

    @ResolveField()
    async author(@Parent() task: TaskInterface): Promise<User | undefined> {
        return this.userService.getById(task.authorId);
    }

    @ResolveField()
    async executor(@Parent() task: TaskInterface): Promise<User | undefined> {
        return this.userService.getById(task.executorId);
    }

    @ResolveField()
    async project(@Parent() task: TaskInterface): Promise<Project | undefined> {
        return this.projectsService.getById(task.projectId);
    }
}
