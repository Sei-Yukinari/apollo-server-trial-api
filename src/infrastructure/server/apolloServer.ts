import { ApolloServer } from '@apollo/server'
import { Context } from '@/types/context'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/dist/esm/plugin/drainHttpServer'
import { getErrorCode } from '../../erros'
import { GraphQLSchema } from 'graphql/type'
import { Disposable } from 'graphql-ws'
import { Server } from 'http'

export const apolloServer = (
  schema: GraphQLSchema,
  httpServer: Server,
  wsServer: Disposable
) => {
  return new ApolloServer<Context>({
    schema: schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async requestDidStart({ contextValue }) {
          // token is properly inferred as a string
          // console.log(contextValue.token)
        },
      },
      {
        async serverWillStart() {
          console.log('serverWillStart')
          return {
            async drainServer() {
              await wsServer.dispose()
            },
          }
        },
      },
    ],
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
