import { createUserRepository } from '@/interface/gateway/user'
import { Role } from '.prisma/client'
import { createUser } from '@/domain/model/user'

describe('prisma', () => {
  const prisma = jestPrisma.client
  const repository = createUserRepository(prisma)
  const seedUser = {
    id: 'AAA',
    name: 'BBB',
    role: Role.ADMIN,
  }
  beforeEach(async () => {
    await prisma.user.create({ data: seedUser })
  })
  test('Add user', async () => {
    const user = await repository.find('AAA')
    expect(user?.id).toBe('AAA')
    expect(user?.name).toBe('BBB')
    expect(user?.role).toBe(Role.ADMIN)
  })
})
