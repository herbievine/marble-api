import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { SchoolPolicyDto } from './school.dto'
import { School } from './school.entity'
import { SchoolService } from './school.service'

@Resolver((of) => School)
export class SchoolResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation(() => School)
  async getSchool(
    @Args('payload', { type: () => SchoolPolicyDto }) payload: SchoolPolicyDto
  ): Promise<School> {
    const school = await this.schoolService.getSchool(payload)

    if (!school) {
      throw new GraphQLError('school does not exist')
    }

    return school
  }
}
