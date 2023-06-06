import {
  Post,
  PostResolvers,
  SubscriptionResolvers,
} from '@/types/generated/graphql'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()
export const post: PostResolvers = {
  Mutation: {
    createPost: async (parent, args): Promise<Post> => {
      await pubsub.publish('POST_CREATED', { postCreated: args })
      return {
        author: args.author,
        comment: args.comment,
      }
    },
  },
  Subscription: {
    hello: {
      subscribe: async function* () {
        for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
          yield { hello: word }
        }
      },
    },
    postCreated: {
      subscribe: (_, __, ctx) => {
        console.log('context', ctx)
        return pubsub.asyncIterator(['POST_CREATED'])
      },
    },
  },
}
