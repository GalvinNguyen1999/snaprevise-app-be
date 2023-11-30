import { userModel } from '~/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

const signUp = async (data) => {
  try {
    const { name, password } = data

    const existUser = await userModel.getUserByName(name)

    if (existUser) { throw new Error('User already exists!') }

    const hashedPassword = await bcrypt.hash(password, 10)

    data.password = hashedPassword

    const user = await userModel.createUser(data)

    return user
  } catch (error) { throw new Error(error) }
}

const signIn = async (data) => {
  try {
    const { name, password } = data

    const user = await userModel.getUserByName(name)

    if (!user) { throw new Error('User does not exist!') }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) { throw new Error('Incorrect password!') }

    const deconstructedUser = {
      id: user.id,
      name: user.name,
      role: user.role
    }

    const token = jwt.sign(deconstructedUser, env.JWT_SECRET, { expiresIn: '1d' })

    return { user, token }
  } catch (error) { throw new Error(error) }
}

export const authService = {
  signUp,
  signIn
}
