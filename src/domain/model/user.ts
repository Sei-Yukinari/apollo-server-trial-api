import { Role } from '.prisma/client'

export interface UserModel {
  id: string
  name: string
  role: Role
  hasRole(string): boolean
}

export function createUser(id: string, name: string, role: Role): UserModel {
  function hasRole(roleName: string): boolean {
    return role === roleName
  }

  return {
    id,
    name,
    role,
    hasRole,
  }
}
