import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Matches } from 'class-validator'

@InputType('CreateOrUpdateUserDto')
export class CreateOrUpdateUserDto {
  @Matches(/^[0-9]{4}$/g)
  @Field()
  schoolId: string

  @IsOptional()
  @Matches(/^[a-zA-Z0-9]\w+$/g)
  @Field((type) => String, { nullable: true })
  username?: string
}
