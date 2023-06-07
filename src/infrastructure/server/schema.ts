import { authDirectiveTransformer } from '@/controller/directive/authDirective'
import { loadSchemaSync } from '@graphql-tools/load'
import { join } from 'path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from '@/controller/resolvers'

const loadedSchema = loadSchemaSync(
  join(__dirname, '../../../schema/*.graphql'),
  {
    loaders: [new GraphQLFileLoader()],
  }
)

const resolverAndSchema = addResolversToSchema({
  schema: loadedSchema,
  resolvers,
})

export const graphqlSchema = () => {
  const { authDirective } = authDirectiveTransformer('auth')
  return authDirective(resolverAndSchema)
}
