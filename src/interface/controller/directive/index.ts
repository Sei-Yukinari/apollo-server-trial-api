import { DirectiveResolvers } from '@/types/generated/graphql'
import { authDirectiveTransformer } from '@/interface/controller/directive/authDirective'

export const directives: DirectiveResolvers = {
  ...authDirectiveTransformer,
}
