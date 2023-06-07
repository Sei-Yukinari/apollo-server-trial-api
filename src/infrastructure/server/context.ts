import { Request } from 'express'
import { Context } from '@/types/context'
import { repositoriesFactory } from '@/interface/gateway'
import { presentersFactory } from '@/interface/presenter'
import { UserModel } from '@/domain/model/user'

export const createHTTPContext = async (req: Request): Promise<Context> => {
  const token = req.headers.authorization as string
  let u: UserModel | undefined
  if (token) {
    u = await repositoriesFactory.user.find('1')
  }
  return {
    token: token,
    user: u,
    repositories: repositoriesFactory,
    presenters: presentersFactory,
  }
}

export const createWSContext = async (token: string): Promise<Context> => {
  return {
    token: token,
    repositories: repositoriesFactory,
    presenters: presentersFactory,
  }
}
