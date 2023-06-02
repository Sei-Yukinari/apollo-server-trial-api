import { IUserRepository } from '../domain/repository/user'
import { UserModel } from '../domain/model/user'
import { PrismaClient, User } from '.prisma/client'

export class UserRepository implements IUserRepository {
  private rdb: PrismaClient
  constructor(r: PrismaClient) {
    this.rdb = r
  }

  private toModel(user: User): UserModel {
    return {
      id: user.id,
      name: user.name,
    }
  }
  async find(id: string): Promise<UserModel | null> {
    const user = await this.rdb.user.findFirst({
      where: {
        id: '1',
      },
    })
    if (!user) {
      return null
    }
    return this.toModel(user)
  }
}
