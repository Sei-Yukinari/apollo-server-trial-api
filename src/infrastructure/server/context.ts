import { Request } from 'express'
import { Context } from '@/types/context'
import { repositoriesFactory } from '@/interface/gateway'
import { presentersFactory } from '@/interface/presenter'

export const createHTTPContext = async (req: Request): Promise<Context> => {
  const token = req.headers.authorization || ''
  const user = await repositoriesFactory.user.find('1')
  return {
    token: token,
    user: user,
    repositories: repositoriesFactory,
    presenters: presentersFactory,
  }
}

export const createWSContext = async (
  token: string
): Promise<Context | null> => {
  return {
    token: token,
    user: null,
    repositories: repositoriesFactory,
    presenters: presentersFactory,
  }
}
