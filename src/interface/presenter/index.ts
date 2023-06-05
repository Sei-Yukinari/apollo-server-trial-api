import { createUserPresenter, IUserPresenter } from './user'

export interface Presenters {
  user: IUserPresenter
}

export const presentersFactory = {
  user: createUserPresenter(),
}
