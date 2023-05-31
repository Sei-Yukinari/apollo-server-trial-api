import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express'
import http, {Server} from 'http'
import cors from 'cors';
import { json } from 'body-parser';
import { join } from 'path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from '@/controller/resolvers'
import * as core from "express-serve-static-core";

const schema = loadSchemaSync(join(__dirname, '../../../schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})


export const setupServer = async (): Promise<Server> => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema,
      resolvers,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
  );
  return httpServer
}
