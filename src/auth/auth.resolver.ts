import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-errors'
import { cookieConfig } from 'src/config'
import { magic } from 'src/magic'
import { User } from 'src/users/user.entity'
import { LoginAuthDto, UpdateAuthDto } from './auth.dto'
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

    try {
      magic().token.validate(didToken)
    } catch {
      throw new ForbiddenError('Unauthorized access')
    }

    const { publicAddress } = await magic().users.getMetadataByToken(didToken)

    const authenticatedUser = await this.authService.login(
      payload,
      publicAddress
    )

    res.cookie('jwt', authenticatedUser.jwt, cookieConfig)

    return authenticatedUser
  }

  @Mutation((returns) => AuthenticatedUser)
  async updateUser(
    @Context() { req, res }: Auth.GqlContext,
    @Args('payload', { type: () => UpdateAuthDto })
    payload: UpdateAuthDto
  ): Promise<AuthenticatedUser> {
    const didToken = req.headers.authorization?.substring(7)

    if (!didToken) {
      throw new ForbiddenError('Unauthorized access')
    }

    try {
      magic().token.validate(didToken)
    } catch {
      throw new ForbiddenError('Unauthorized access')
    }

    const { publicAddress } = await magic().users.getMetadataByToken(didToken)

    const authenticatedUser = await this.authService.updateUser(
      payload,
      publicAddress
    )

    res.cookie('jwt', authenticatedUser.jwt, cookieConfig)

    return authenticatedUser
  }
}
