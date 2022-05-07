import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {UserModule} from '../user/user.module';
import {ProjectsModule} from '../projects/projects.module';
import {TaskResolver} from './task.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule, ProjectsModule],
    providers: [TasksService, TaskResolver],
    exports: [TasksService]
})
export class TasksModule {}
