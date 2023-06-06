import { defaultFieldResolver } from 'graphql/execution'
import { GraphQLSchema } from 'graphql/type'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { errorName } from '../../erros'

export const authDirectiveTransformer = (directiveName: string) => {
  return {
    authDirective: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: fieldConfig => {
          const directive = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0]
          if (directive) {
            const originalResolve = fieldConfig.resolve || defaultFieldResolver
            fieldConfig.resolve = async function (source, args, context, info) {
              // contextの情報が取得できる
              const token = context.token
              // トークンチェックなど...
              if (!token) {
                throw new Error(errorName.UNAUTHENTICATED)
              }
              const user = context.user

              if (user.role != 'ADMIN') {
                throw new Error(errorName.UNAUTHORIZED)
              }

              return originalResolve(source, args, context, info)
            }
            return fieldConfig
          }
        },
      }),
  }
}
