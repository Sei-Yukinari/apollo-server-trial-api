import { QueryResolvers, User } from '../../types/generated/graphql'
export const user: QueryResolvers['user'] = async (
  parent,
  args,
  context
): Promise<User> => ({
  id: args.id,
  name: 'bbbb',
})
