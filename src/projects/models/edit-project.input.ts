import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class EditProjectInput {
    @Field()
    name: string;

    @Field()
    description: string;
}
