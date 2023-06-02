import { UserModel } from '../../domain/model/user'
import { User } from '../../types/generated/graphql'

export interface IUserPresenter {
  user(user: UserModel): User
}

export class userPresenter implements IUserPresenter {
  user(user: UserModel): User {
    return {
      id: user.id,
      name: user.name,
    }
  }
}
