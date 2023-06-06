import { DirectiveResolvers } from '@/types/generated/graphql'
import { authDirectiveTransformer } from '@/controller/directive/authDirective'

export const directives: DirectiveResolvers = {
  ...authDirectiveTransformer,
}
