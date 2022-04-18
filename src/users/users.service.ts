import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginUserDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async login(payload: LoginUserDto): Promise<User> {
    const { user: userService } = this.prismaService

    const { didToken, schoolId } = payload

    let user: User

    try {
      user = await userService.create({
        data: {
          didToken,
          school: {
            connect: {
              id: +schoolId
            }
          }
        },
        include: {
          school: true
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          user = await userService.findUnique({
            where: {
              didToken
            },
            include: {
              school: true
            }
          })
        }
      } else {
        throw new BadRequestException()
      }
    }

    return user
  }
}
