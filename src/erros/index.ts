export const errorName = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
}

export const errorType = {
  UNAUTHENTICATED: {
    message: 'Authentication is needed to get the requested response.',
    statusCode: 401,
  },
  UNAUTHORIZED: {
    message: 'Authorization not has Role',
    statusCode: 403,
  },
  USER_NOT_FOUND: {
    message: 'User does not exist',
    statusCode: 404,
  },
}

export const getErrorCode = errorName => {
  return errorType[errorName]
}
