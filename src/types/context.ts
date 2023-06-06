import { Repositories } from '@/interface/gateway'
import { Presenters } from '@/interface/presenter'
import { UserModel } from '@/domain/model/user'

export interface Context {
  token?: string
  user: UserModel | null
  repositories: Repositories
  presenters: Presenters
}
