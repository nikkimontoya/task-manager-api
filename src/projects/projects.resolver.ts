import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Project} from './models/project.model';
import {Project as ProjectEntity} from './entities/project.entity';
import {ProjectsService} from './projects.service';
import {UserService} from '../user/user.service';
import {User} from '../user/entities/user.entity';
import {TasksService} from '../tasks/tasks.service';
import {EditProjectInput} from './models/edit-project.input';
import {CreateProjectInput} from './models/create-project.input';

@Resolver((of: unknown) => Project)
export class ProjectsResolver {
    constructor(
        private projectService: ProjectsService,
        private userService: UserService,
        private tasksService: TasksService
    ) {}

    @Query((returns) => [Project])
    async projects(
        @Args('ids', {type: () => [ID], nullable: true}) ids?: number[],
        @Args('administratorId', {type: () => ID, nullable: true}) administratorId?: number
    ) {
        if (ids) {
            return this.projectService.getByIds(ids);
        }

        if (administratorId) {
            return this.projectService.getAll({administratorId});
        }

        return this.projectService.getAll();
    }

    @Mutation((returns) => Project)
    async createProject(
        @Args('project', {type: () => CreateProjectInput}) project: CreateProjectInput
    ): Promise<ProjectEntity> {
        return this.projectService.create(project);
    }

    @Mutation((returns) => Project)
    async editProject(
        @Args('id', {type: () => ID}) id: string,
        @Args('project', {type: () => EditProjectInput}) project: EditProjectInput
    ): Promise<ProjectEntity> {
        return this.projectService.update(parseInt(id, 10), project);
    }

    @Mutation((returns) => Project)
    async addParticipants(
        @Args('id', {type: () => ID}) id: string,
        @Args('participantsIds', {type: () => [ID]}) participantsIds: string[]
    ): Promise<ProjectEntity> {
        return this.projectService.addParticipants(
            parseInt(id, 10),
            participantsIds.map((pid) => parseInt(pid, 10))
        );
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
