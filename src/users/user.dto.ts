import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString, Matches } from 'class-validator'

@InputType('CreateOrLoginUserDto')
export class CreateOrLoginUserDto {
  @Matches(/^[0-9]{4}$/g)
  @Field()
  schoolId: string

  @IsOptional()
  @Matches(/^[a-zA-Z0-9]\w+$/g)
  @Field((type) => String, { nullable: true })
  username?: string

  @IsString()
  @Field()
  didToken: string
}
