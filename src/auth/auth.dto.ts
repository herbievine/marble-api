import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Matches } from 'class-validator'

@InputType('LoginAuthDto')
export class LoginAuthDto {
  @Matches(/^[0-9]{4}$/)
  @Field()
  schoolId: string
}

@InputType('UpdateAuthDto')
export class UpdateAuthDto {
  @Matches(/^[a-zA-Z0-9]\w+$/)
  @Field((type) => String)
  username: string
}
