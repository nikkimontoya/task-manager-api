import {TaskInterface} from '../types/task.interface';
import {UserInterface} from '../../user/types/user.interface';
import {Project} from '../../projects/entities/project.entity';

export class TasksDto {
    data: TaskInterface[];
    included: {
        users: UserInterface[];
        projects: Project[];
    };
}
