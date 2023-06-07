import { Resolvers } from '@/types/generated/graphql'
import { user } from '@/interface/controller/resolvers/user'
import { todo } from '@/interface/controller/resolvers/todo'
import { post } from '@/interface/controller/resolvers/post'

export const resolvers: Resolvers = {
  ...todo,
  ...user,
  ...post,
}
