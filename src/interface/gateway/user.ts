import { IUserRepository } from '@/domain/repository/user'
import { createUser, UserModel } from '@/domain/model/user'
import { PrismaClient, User } from '.prisma/client'

async function findUser(
  id: string,
  rdb: PrismaClient
): Promise<UserModel | null> {
  const user = await rdb.user.findFirst({
    where: {
      id: id,
    },
  })
  if (!user) {
    return null
  }
  return createUser(user.id, user.name, user.role)
}

export function createUserRepository(r: PrismaClient): IUserRepository {
  return {
    find: (id: string) => findUser(id, r),
  }
}
