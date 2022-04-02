import {Module} from '@nestjs/common';
import {ProjectsController} from './projects.controller';
import {ProjectsService} from './projects.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from './entities/project.entity';
import {UserModule} from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), UserModule],
    exports: [ProjectsService],
    controllers: [ProjectsController],
    providers: [ProjectsService]
})
export class ProjectsModule {}