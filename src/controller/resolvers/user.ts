import {
  MutationCreateUserArgs,
  Todo,
  TodoStatus,
  User,
  UserResolvers,
} from '@/types/generated/graphql'

import { dbClient } from '@/infrastructure/rdb/client'
import { GraphQLError } from 'graphql/error'
import { Context } from '@/types/context'
import { errorName } from '../../erros'

export const user: UserResolvers<User> = {
  Query: {
    user: async (parent, args, ctx: Context): Promise<User> => {
      const user = await ctx.repositories.user.find('1')
      if (!user) {
        throw new Error(errorName.USER_NOT_FOUND)
      }
      return ctx.presenters.user.user(user)
    },
  },
  Mutation: {
    createUser: async (parent, args, context): Promise<User> => {
      console.log('args', args)
      return createUser(args)
    },
  },
  User: {
    todos(parent: User): Todo[] {
      return [
        {
          id: 1,
          title: 'a',
          status: TodoStatus.Done,
          userId: 'aaa',
        },
      ]
    },
  },
}

async function getUser(): Promise<User> {
  const u = await dbClient.user.findUnique({
    where: {
      id: '2',
    },
  })

  if (u == null) {
    throw new GraphQLError('Invalid argument value', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    })
  }

  return {
    id: u?.id,
    name: u?.name,
  }
}

async function createUser(args: MutationCreateUserArgs): Promise<User> {
  return {
    id: 'aa',
    name: 'bb',
  }
}
