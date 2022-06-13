import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {Task} from '../../tasks/models/task.model';
import {User} from '../../user/models/user.model';

@ObjectType()
export class Project {
    @Field((type) => ID)
    id: number;

    @Field()
    name: string;

    @Field({nullable: true})
    description: string;

    @Field((type) => [Task])
    tasks: Task[];

    @Field((type) => [User])
    users: User[];

    @Field((type) => User)
    administrator: User;

    @Field((type) => GraphQLISODateTime)
    createdAt: Date;

    @Field((type) => GraphQLISODateTime)
    updatedAt: Date;
}
