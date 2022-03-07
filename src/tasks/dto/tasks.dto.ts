import {TaskInterface} from '../types/task.interface';
import {UserInterface} from '../../user/types/user.interface';

export class TasksDto {
    data: TaskInterface[];
    included: {
        users: UserInterface[];
    };
}
