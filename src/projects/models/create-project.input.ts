import {Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field((type) => ID)
    administrator: string;
}
