import { Repositories } from '@/interface/gateway'
import { Presenters } from '@/interface/presenter'

export interface Context {
  token?: string
  repositories: Repositories
  presenters: Presenters
}
