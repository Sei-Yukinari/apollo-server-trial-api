import { Repositories } from '../gateway'
import { Presenters } from '../inteface/presenter'

export interface Context {
  token?: string
  repositories: Repositories
  presenters: Presenters
}
