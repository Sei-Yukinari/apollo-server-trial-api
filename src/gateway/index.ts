import { IUserRepository } from '../domain/repository/user'
import { UserRepository } from './user'
import { prisma } from '@/infrastructure/rdb/client'

export interface Repositories {
  user: IUserRepository
}

export const repositoriesFactory = {
  user: new UserRepository(prisma),
}
