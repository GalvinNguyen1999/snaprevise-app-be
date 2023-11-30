import { userService } from '~/services/userService'
import { StatusCodes } from 'http-status-codes'

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}

export const userController = {
  updateUser,
  deleteUser,
  getUserById
}
