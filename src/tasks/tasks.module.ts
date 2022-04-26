import {Module} from '@nestjs/common';
import {TasksController} from './tasks.controller';
import {TasksService} from './tasks.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {UserModule} from '../user/user.module';
import {ProjectsModule} from '../projects/projects.module';
import {TaskResolver} from './task.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule, ProjectsModule],
    controllers: [TasksController],
    providers: [TasksService, TaskResolver]
})
export class TasksModule {}
