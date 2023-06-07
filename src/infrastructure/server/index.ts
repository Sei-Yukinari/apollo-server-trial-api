import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import { Context } from '@/types/context'
import config from 'config'
import { createWebSocketServer } from '@/infrastructure/server/webSocket'

import { graphqlSchema } from '@/infrastructure/server/schema'
import { createHTTPContext } from '@/infrastructure/server/context'
import { apolloServer } from '@/infrastructure/server/apolloServer'

export async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = graphqlSchema()
  const wsServer = createWebSocketServer(httpServer, schema)
  const server = apolloServer(schema, httpServer, wsServer)
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
