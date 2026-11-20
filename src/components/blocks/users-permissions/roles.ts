export const roles = ['Admin', 'Operations', 'Finance', 'Sales', 'Warehouse', 'Viewer'] as const
export type Role = (typeof roles)[number]

export type UserStatus = 'Active' | 'Invited' | 'Suspended'
export type User = {
  id: number
  name: string
  email: string
  role: Role
  status: UserStatus
  lastActive: string | null
}

export const statusSeverity: Record<UserStatus, 'success' | 'info' | 'danger'> = {
  Active: 'success',
  Invited: 'info',
  Suspended: 'danger',
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** True when changing or suspending this user would leave no active admin. */
export function isLastActiveAdmin(users: User[], user: User) {
  if (user.role !== 'Admin' || user.status !== 'Active') return false
  return !users.some(
    (other) => other.id !== user.id && other.role === 'Admin' && other.status === 'Active',
  )
}

export const lastAdminMessage = (user: User) =>
  `${user.name} is the only active admin. Make another active user an admin first so someone can still manage access.`
