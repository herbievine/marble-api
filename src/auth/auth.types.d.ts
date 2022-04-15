import { GraphQLExecutionContext } from '@nestjs/graphql'
import { Request, Response } from 'express'

namespace Auth {
  interface GqlContext extends GraphQLExecutionContext {
    req: Request
    res: Response
  }
}

export { Auth }
