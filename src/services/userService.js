import { userModel } from '~/models/userModel'
import bcrypt from 'bcrypt'


const updateUser = async (id, data) => {
  try {
    const { password } = data
    const SALT = 10

    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT)
      data.password = hashedPassword
    }

    const user = await userModel.updateUser(id, data)
    return user
  } catch (error) { throw new Error(error) }
}

const deleteUser = async (id) => {
  try {
    const user = await userModel.deleteUser(id)
    return user
  } catch (error) { throw new Error(error) }
}

const getUserById = async (id) => {
  try {
    const user = await userModel.getUserById(id)
    return user
  } catch (error) { throw new Error(error) }
}

export const userService = {
  updateUser,
  deleteUser,
  getUserById
}
