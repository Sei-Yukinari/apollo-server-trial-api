import { IUserRepository } from '@/domain/repository/user'
import { createUserRepository } from './user'
import { dbClient } from '@/infrastructure/rdb/client'

export interface Repositories {
  user: IUserRepository
}

export const repositoriesFactory = {
  user: createUserRepository(dbClient),
}
