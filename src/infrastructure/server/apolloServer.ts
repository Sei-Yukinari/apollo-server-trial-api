import { ApolloServer } from '@apollo/server'
import { getErrorCode } from '../../erros'
import { GraphQLSchema } from 'graphql/type'
import { Disposable } from 'graphql-ws'
import { Server } from 'http'
import { plugins } from '@/infrastructure/server/plugin'

export const apolloServer = (
  schema: GraphQLSchema,
  httpServer: Server,
  wsServer: Disposable
): ApolloServer => {
  return new ApolloServer({
    schema: schema,
    plugins: plugins(httpServer, wsServer),
    formatError: err => {
      const error = getErrorCode(err.message)
      return {
        message: error.message,
        statusCode: error.statusCode,
        path: err.path,
      }
    },
  })
}
