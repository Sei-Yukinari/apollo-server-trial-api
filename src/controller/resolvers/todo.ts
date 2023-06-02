import { Todo, TodoResolvers, TodoStatus } from '../../types/generated/graphql'

export const todo: TodoResolvers = {
  Query: {
    todos: async (parent, args, ctx) => todos(),
  },
}

async function todos(): Promise<Todo[]> {
  return [
    {
      id: 1,
      title: 'a',
      status: TodoStatus.Done,
      userId: 'aaa',
    },
  ]
}
