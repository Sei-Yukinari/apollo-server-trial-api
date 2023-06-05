import { User } from '.prisma/client'
import { UserRepository } from '../../gateway/user'
import { UserModel } from '../../domain/model/user'
import * as console from 'console'

describe('prisma', () => {
  const prisma = jestPrisma.client
  const repository = new UserRepository(prisma)
  const crateUser = {
    id: 'AAA',
    name: 'BBB',
  }
  beforeEach(async () => {
    await prisma.user.create({ data: crateUser })
  })
  test('Add user', async () => {
    const user = await repository.find('AAA')
    expect(user).toStrictEqual(crateUser)
  })
})
