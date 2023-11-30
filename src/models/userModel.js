import { DataTypes } from 'sequelize'
import { GET_DB, sequelize } from '~/config/database'

const User = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
        len: {
          args: [3, 255],
          msg: 'Name must be between 3 and 255 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [3, 255],
          msg: 'Password must be between 3 and 255 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false
    }
  },
  {
    paranoid: true
  }
)

const createUser = async (data) => {
  try {
    const user = await GET_DB().users.create(data)
    return user
  } catch (error) { throw new Error(error) }
}

const getUserByName = async (name) => {
  try {
    const user = await GET_DB().users.findOne({ where: { name } })
    return user
  } catch (error) { throw new Error(error) }
}

const getUserById = async (id) => {
  try {
    const user = await GET_DB().users.findOne({ where: { id } })
    return user
  } catch (error) { throw new Error(error) }
}

const updateUser = async (id, data) => {
  try {
    const user = await GET_DB().users.update(data, { where: { id } })
    return user
  } catch (error) { throw new Error(error) }
}

const deleteUser = async (id) => {
  try {
    const user = await GET_DB().users.destroy({ where: { id } })
    return user
  } catch (error) { throw new Error(error) }
}

const getUsers = async () => {
  try {
    const users = await GET_DB().users.findAll()
    return users
  } catch (error) { throw new Error(error) }
}

// get all user, including soft deleted
const getAllUsers = async () => {
  try {
    const users = await GET_DB().users.findAll({ paranoid: false })
    return users
  } catch (error) { throw new Error(error) }
}

const assignAdminRole = async (id) => {
  try {
    const user = await GET_DB().users.update({ role: 'admin' }, { where: { id } })
    return user
  } catch (error) { throw new Error(error) }
}

const assignUserRole = async (id) => {
  try {
    const user = await GET_DB().users.update({ role: 'user' }, { where: { id } })
    return user
  } catch (error) { throw new Error(error) }
}

export const userModel = {
  User,
  createUser,
  getUserByName,
  assignAdminRole,
  assignUserRole,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
  getAllUsers
}
