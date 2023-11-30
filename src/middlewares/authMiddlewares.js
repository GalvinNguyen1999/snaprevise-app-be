import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }
}

export const authorizeUser = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized - User not logged in' })
    }

    const userRoles = req.user.role
    if (!userRoles.includes(requiredRole)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden - Insufficient permissions' })
    }

    next()
  }
}
