import { InputType, Field } from '@nestjs/graphql'
import { Matches } from 'class-validator'

@InputType('SchoolPolicyDto')
export class SchoolPolicyDto {
  @Matches(/^[0-9]{4}$/)
  @Field()
  schoolId: string
}
