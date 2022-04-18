import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-errors'
import { cookieConfig } from 'src/config'
import { User } from 'src/users/user.entity'
import { LoginAuthDto } from './auth.dto'
import { AuthenticatedUser } from './auth.entity'
import { AuthService } from './auth.service'
import { Auth } from './auth.types'

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }

  @Mutation((returns) => AuthenticatedUser)
  async login(
    @Context() { req, res }: Auth.GqlContext,
    @Args('payload', { type: () => LoginAuthDto })
    payload: LoginAuthDto
  ): Promise<AuthenticatedUser> {
    const didToken = req.headers.authorization?.substring(7)

    if (!didToken) {
      throw new ForbiddenError('Unauthorized access')
    }

    const authenticatedUser = await this.authService.login(payload, didToken)

    // res.cookie('jwt', authenticatedUser.jwt, cookieConfig)

    return authenticatedUser
  }
}
