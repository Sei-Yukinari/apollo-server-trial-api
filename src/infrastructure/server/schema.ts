import { GraphQLSchema } from 'graphql/type'
import { authDirectiveTransformer } from '@/controller/directive/authDirective'

export const mapDirective = (schema): GraphQLSchema => {
  const { authDirective } = authDirectiveTransformer('auth')
  return authDirective(schema)
}
