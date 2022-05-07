import {Field, GraphQLISODateTime, ID, InputType, Int} from '@nestjs/graphql';

@InputType()
export class TaskInput {
    @Field()
    title: string;

    @Field()
    body: string;

    @Field((type) => ID)
    authorId: number;

    @Field((type) => ID)
    executorId: number;

    @Field((type) => GraphQLISODateTime, {nullable: true})
    deadlineDate: Date;

    @Field((type) => ID)
    projectId: number;
}
