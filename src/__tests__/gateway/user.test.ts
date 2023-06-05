import { createUserRepository } from '../../interface/gateway/user'

describe('prisma', () => {
  const prisma = jestPrisma.client
  const repository = createUserRepository(prisma)
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
