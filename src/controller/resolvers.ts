import { Resolvers } from '../types/generated/graphql'
import * as query from './query'
import { user } from './query/user'

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'AAAAAAA',
    user,
  },
}
