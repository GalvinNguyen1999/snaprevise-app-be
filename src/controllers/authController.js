import { authService } from '~/services/authService'
import { StatusCodes } from 'http-status-codes'

const signUp = async (req, res, next) => {
  try {
    const user = await authService.signUp(req.body)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) { next(error) }
}

const signIn = async (req, res, next) => {
  try {
    const { user, token } = await authService.signIn(req.body)
    return res.status(StatusCodes.OK).json({ user, token })
  } catch (error) { next(error) }
}

export const authController = {
  signUp,
  signIn
}
