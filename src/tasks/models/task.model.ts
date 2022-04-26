import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {User} from '../../user/models/user.model';
import {Project} from '../../projects/models/project.model';

@ObjectType()
export class Task {
    @Field((type) => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field((type) => User)
    author: User;

    @Field((type) => User)
    executor: User;

    @Field((type) => GraphQLISODateTime, {nullable: true})
    deadlineDate: Date;

    @Field((type) => Project)
    project: Project;

    @Field((type) => GraphQLISODateTime)
    createdAt: Date;
}
