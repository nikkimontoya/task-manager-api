import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class ProjectInput {
    @Field()
    name: string;

    @Field()
    description: string;
}