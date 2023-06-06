import { Resolvers } from '@/types/generated/graphql'
import { user } from '@/controller/resolvers/user'
import { todo } from '@/controller/resolvers/todo'
import { post } from '@/controller/resolvers/post'

export const resolvers: Resolvers = {
  ...todo,
  ...user,
  ...post,
}
