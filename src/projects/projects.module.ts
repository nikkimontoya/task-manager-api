import {forwardRef, Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from './entities/project.entity';
import {UserModule} from '../user/user.module';
import {ProjectsResolver} from './projects.resolver';
import {TasksModule} from '../tasks/tasks.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), UserModule, forwardRef(() => TasksModule)],
    exports: [ProjectsService],
    providers: [ProjectsService, ProjectsResolver]
})
export class ProjectsModule {}
