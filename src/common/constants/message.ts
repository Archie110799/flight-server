export const Message = {
  success: {
    AUTH_LOGIN: 'LOGIN_SUCCESS',
    AUTH_LOGOUT: 'LOGOUT_SUCCESS',
    AUTH_REGISTER: 'REGISTER_SUCCESS',
  },
  error: {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    410: 'RESOURCE_ALREADY_DELETE',
    429: 'TOO_MANY_REQUESTS',
    500: 'INTERNAL_SERVER_ERROR',
    PASSWORD_NOT_MATCHED: 'PASSWORD_NOT_MATCHED',
    ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    SESSION_TIMEOUT: 'SESSION_TIMEOUT',
    NOT_FOUND: (field: string) => `${field.toUpperCase()}_NOT_FOUND`,
    ALREADY_DELETE: (field: string) => `${field.toUpperCase()}_ALREADY_DELETE`,
  },
};