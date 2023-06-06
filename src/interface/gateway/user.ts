import { IUserRepository } from '@/domain/repository/user'
import { UserModel } from '@/domain/model/user'
import { PrismaClient, User } from '.prisma/client'

function toModel(user: User): UserModel {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  }
}

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
  return toModel(user)
}

export function createUserRepository(r: PrismaClient): IUserRepository {
  return {
    find: (id: string) => findUser(id, r),
  }
}
