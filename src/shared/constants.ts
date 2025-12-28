export const ROLES = {
  MANAGER: 'Manager',
  ADMIN: 'Admin',
  DEVELOPER: 'Developer',
} as const;

export const SOCKET_EVENTS = {
  COMPANY_CREATED: 'company_created',
  COMPANY_UPDATED: 'company_updated',
  COMPANY_DELETED: 'company_deleted',
  EMPLOYEE_CREATED: 'employee_created',
  EMPLOYEE_UPDATED: 'employee_updated',
  EMPLOYEE_DELETED: 'employee_deleted',
  CONNECTED: 'connected',
  PING: 'ping',
  PONG: 'pong',
} as const;

export const API_PREFIX = '/api';