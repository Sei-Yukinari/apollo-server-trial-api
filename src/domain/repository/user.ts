import { UserModel } from '../model/user'

export interface IUserRepository {
  find(id: string): Promise<UserModel | undefined>
}
