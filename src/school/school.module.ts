import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SchoolResolver } from './school.resolver'
import { SchoolService } from './school.service'

@Module({
  providers: [SchoolResolver, SchoolService, PrismaService]
})
export class SchoolModule {}
