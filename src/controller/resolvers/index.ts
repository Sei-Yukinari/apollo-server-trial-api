import { Resolvers } from '@/types/generated/graphql'
import { user } from '@/controller/resolvers/user'
import { todo } from '@/controller/resolvers/todo'

export const resolvers: Resolvers = {
  ...todo,
  ...user,
}
