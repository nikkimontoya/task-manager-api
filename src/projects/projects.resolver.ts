import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Project} from './models/project.model';
import {Project as ProjectEntity} from './entities/project.entity';
import {ProjectsService} from './projects.service';
import {UserService} from '../user/user.service';
import {User} from '../user/entities/user.entity';

@Resolver((of: unknown) => Project)
export class ProjectsResolver {
    constructor(private projectService: ProjectsService, private userService: UserService) {}

    @Query((returns) => [Project])
    async projects() {
        return this.projectService.getAll();
    }

    @ResolveField()
    async administrator(@Parent() project: ProjectEntity): Promise<User | undefined> {
        return this.userService.getById(project.administratorId);
    }
}
