import { UserModel } from '@/domain/model/user'
import { User } from '@/types/generated/graphql'

export interface IUserPresenter {
  user(user: UserModel): User
}

export function createUserPresenter(): IUserPresenter {
  return {
    user: (user: UserModel) => {
      return {
        id: user.id,
        name: user.name,
      }
    },
  }
}
