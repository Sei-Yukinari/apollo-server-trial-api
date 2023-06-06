import { createUserRepository } from '@/interface/gateway/user'
import { Role } from '.prisma/client'

describe('prisma', () => {
  const prisma = jestPrisma.client
  const repository = createUserRepository(prisma)
  const crateUser = {
    id: 'AAA',
    name: 'BBB',
    role: Role.ADMIN,
  }
  beforeEach(async () => {
    await prisma.user.create({ data: crateUser })
  })
  test('Add user', async () => {
    const user = await repository.find('AAA')
    expect(user).toStrictEqual(crateUser)
  })
})
