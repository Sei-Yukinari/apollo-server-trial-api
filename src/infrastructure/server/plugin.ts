import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { Server } from 'http'
import { Disposable } from 'graphql-ws'

export const plugins = (httpServer: Server, wsServer: Disposable) => {
  return [
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
  ]
}
