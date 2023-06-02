export const errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
}

export const errorType = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get the requested response.',
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    message: 'User does not exist',
    statusCode: 404,
  },
}

export const getErrorCode = errorName => {
  return errorType[errorName]
}
