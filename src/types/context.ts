import { Repositories } from '../gateway'

export interface Context {
  token?: string
  repositories: Repositories
}
