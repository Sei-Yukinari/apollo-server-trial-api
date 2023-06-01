import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import { join } from 'path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { resolvers } from '@/controller/resolvers'
import { Context } from '../../types/context'

const schema = loadSchemaSync(join(__dirname, '../../../schema/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

export async function start() {
  const app = express()
  const httpServer = http.createServer(app)

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer<Context>({
    schema: addResolversToSchema({
      schema,
      resolvers,
    }),
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
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: 'aaaaaaa' }),
    })
  )
  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}
