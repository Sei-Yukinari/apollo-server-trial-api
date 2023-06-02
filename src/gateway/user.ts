import { IUserRepository } from '../domain/repository/user'
import { UserModel } from '../domain/model/user'
import { PrismaClient } from '.prisma/client'

export class UserRepository implements IUserRepository {
  private rdb: PrismaClient
  constructor(r: PrismaClient) {
    this.rdb = r
  }
  async find(id: string): Promise<UserModel | null> {
    const user = await this.rdb.user.findFirst({
      where: {
        id: '2',
      },
    })
    if (!user) {
      return null
    }
    return {
      id: user.id,
      name: user.name,
    }
  }
}
