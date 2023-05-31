import { QueryResolvers, User } from '../../types/generated/graphql'
export const user: QueryResolvers['user'] = async (
  parent,
  args,
  context
): Promise<User> => {
  console.log(context)
  const result = {
    id: args.id,
    name: 'bbbb',
  }

  return result
}
