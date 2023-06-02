import { IUserPresenter, userPresenter } from './user'

export interface Presenters {
  user: IUserPresenter
}

export const presentersFactory = {
  user: new userPresenter(),
}
