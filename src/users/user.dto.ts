import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString, Matches } from 'class-validator'

@InputType('LoginUserDto')
export class LoginUserDto {
  @Matches(/^[0-9]{4}$/)
  @Field()
  schoolId: string

  @IsString()
  @Field()
  didToken: string
}
