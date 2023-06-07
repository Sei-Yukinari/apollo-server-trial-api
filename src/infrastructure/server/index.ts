import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import { Context } from '@/types/context'
import config from 'config'
import { getErrorCode } from '../../erros'
import { createWebSocketServer } from '@/infrastructure/server/webSocket'

import { graphqlSchema } from '@/infrastructure/server/schema'
import { createHTTPContext } from '@/infrastructure/server/context'

export async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = graphqlSchema()
  const wsServer = createWebSocketServer(httpServer, schema)
  const server = new ApolloServer<Context>({
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
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        return createHTTPContext(req)
      },
    })
  )
  httpServer.listen({ port: config.get('app.port') }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${config.get('app.port')}/graphql`
    )
  })
}
