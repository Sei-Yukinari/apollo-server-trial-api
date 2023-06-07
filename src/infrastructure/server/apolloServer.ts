import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { getErrorCode } from '../../erros'
import { GraphQLSchema } from 'graphql/type'
import { Disposable } from 'graphql-ws'
import { Server } from 'http'

export const apolloServer = (
  schema: GraphQLSchema,
  httpServer: Server,
  wsServer: Disposable
): ApolloServer => {
  return new ApolloServer({
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
