import {Args, ID, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Project} from './models/project.model';
import {Project as ProjectEntity} from './entities/project.entity';
import {ProjectsService} from './projects.service';
import {UserService} from '../user/user.service';
import {User} from '../user/entities/user.entity';
import {TasksService} from '../tasks/tasks.service';

@Resolver((of: unknown) => Project)
export class ProjectsResolver {
    constructor(
        private projectService: ProjectsService,
        private userService: UserService,
        private tasksService: TasksService
    ) {}

    @Query((returns) => [Project])
    async projects(@Args('ids', {type: () => [ID], nullable: true}) ids?: number[]) {
        if (ids) {
            return this.projectService.getByIds(ids);
        }

        return this.projectService.getAll();
    }

    @ResolveField()
    async administrator(@Parent() project: ProjectEntity): Promise<User | undefined> {
        return this.userService.getById(project.administratorId);
    }

    @ResolveField()
    async users(@Parent() project: ProjectEntity): Promise<Partial<User>[]> {
        return this.userService.getByIds(project.userIds);
    }

    @ResolveField()
    async tasks(@Parent() project: ProjectEntity) {
        return this.tasksService.getByIds(project.taskIds);
    }
}
