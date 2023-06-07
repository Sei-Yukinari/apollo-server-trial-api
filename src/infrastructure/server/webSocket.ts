import { useServer } from 'graphql-ws/lib/use/ws'
import { Context } from '@/types/context'
import { createWSContext } from '@/infrastructure/server/context'
import { WebSocketServer } from 'ws'
import { GraphQLSchema } from 'graphql/type'
import { Server } from 'http'
import { Disposable } from 'graphql-ws'

export const createWebSocketServer = (
  httpServer: Server,
  schema: GraphQLSchema
): Disposable => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  return useServer(
    {
      schema: schema,
      context: async (ctx): Promise<Context | null> => {
        const token = ctx.connectionParams?.Authorization || ''
        if (typeof token === 'string') {
          return createWSContext(token)
        }
        return null
      },
      onConnect: ctx => {
        console.log('onConnect', ctx.connectionParams)
      },
      onDisconnect(ctx, code, reason) {
        console.log('Disconnected!')
      },
    },
    wsServer
  )
}
