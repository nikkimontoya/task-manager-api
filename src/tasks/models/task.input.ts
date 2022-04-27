import {Field, GraphQLISODateTime, InputType, Int} from '@nestjs/graphql';

@InputType()
export class TaskInput {
    @Field()
    title: string;

    @Field()
    body: string;

    @Field((type) => Int)
    authorId: number;

    @Field((type) => Int)
    executorId: number;

    @Field((type) => GraphQLISODateTime, {nullable: true})
    deadlineDate: Date;

    @Field((type) => Int)
    projectId: number;
}
